package com.cww.invoice.leave.service.impl;

import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.employee.repository.EmployeeRepository;
import com.cww.invoice.leave.dto.employeeBalance.EmployeeBalanceResponseDTO;
import com.cww.invoice.leave.dto.leaveRequest.CreateLeaveRequestDTO;
import com.cww.invoice.leave.dto.leaveRequest.LeaveRequestResponseDTO;
import com.cww.invoice.leave.entity.*;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import com.cww.invoice.leave.mapper.LeaveRequestMapper;
import com.cww.invoice.leave.repository.*;
import com.cww.invoice.leave.service.EmployeeBalanceService;
import com.cww.invoice.user.entity.Role;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final UserRepository userRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final EmployeeBalanceService balanceService;
    private final EmployeeRepository employeeRepository;
    private final ApprovalFlowStepRepository approvalFlowStepRepository;
    private final ApprovalFlowRepository approvalFlowRepository;
    private final LeaveApprovalRepository leaveApprovalRepository;

    /* =================================
       APPLY LEAVE
     ================================= */

    public LeaveRequestResponseDTO applyLeave(
            UUID companyId,
            UUID employeeId,
            CreateLeaveRequestDTO dto) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!employee.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }

        LeaveType leaveType = leaveTypeRepository
                .findById(dto.getLeaveTypeId())
                .orElseThrow(() -> new RuntimeException("Leave type not found"));

        if (dto.getFromDate().isAfter(dto.getToDate())) {
            throw new RuntimeException("Invalid leave dates");
        }

        boolean overlapping =
                leaveRequestRepository
                        .existsByEmployee_IdAndFromDateLessThanEqualAndToDateGreaterThanEqual(
                                employee.getId(),
                                dto.getToDate(),
                                dto.getFromDate()
                        );

        if (overlapping) {
            throw new RuntimeException("Leave already exists for selected dates");
        }

        double days = calculateDays(
                dto.getFromDate(),
                dto.getToDate(),
                dto.getHalfDay()
        );

        int year = dto.getFromDate().getYear();

        EmployeeBalanceResponseDTO balance =
                balanceService.getBalance(
                        companyId,
                        employeeId,
                        dto.getLeaveTypeId(),
                        year
                );

        if (balance.getRemainingDays() < days) {
            throw new RuntimeException("Insufficient leave balance");
        }

        LeaveRequest request = LeaveRequest.builder()
                .employee(employee)
                .leaveType(leaveType)
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate())
                .totalDays(days)
                .halfDay(dto.getHalfDay())
                .reason(dto.getReason())
                .filePath(
                        dto.getFilePath() != null && !dto.getFilePath().isBlank()
                                ? dto.getFilePath()
                                : null
                )
                .contact(dto.getContact())
                .status(LeaveStatus.PENDING)
                .approvalLevelCurrent(1)
                .submittedAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();

        LeaveRequest saved = leaveRequestRepository.save(request);

        createApprovals(companyId, saved);

        return LeaveRequestMapper.toDTO(saved);
    }

    /* =================================
       GET EMPLOYEE LEAVES
     ================================= */

    public List<LeaveRequestResponseDTO> getEmployeeLeaves(
            UUID companyId,
            UUID employeeId,
            LeaveStatus status) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!employee.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }

        List<LeaveRequest> requests;

        if (status != null) {
            requests = leaveRequestRepository
                    .findByEmployee_IdAndStatus(employeeId, status);
        } else {
            requests = leaveRequestRepository
                    .findByEmployee_Id(employeeId);
        }

        return requests.stream()
                .map(LeaveRequestMapper::toDTO)
                .toList();
    }


    public LeaveRequestResponseDTO getLeaveById(
            UUID companyId,
            UUID employeeId,
            UUID leaveRequestId) {

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!employee.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }

        LeaveRequest request = leaveRequestRepository
                .findById(leaveRequestId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        if (!request.getEmployee().getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }

        return LeaveRequestMapper.toDTO(request);
    }



    //


    public List<LeaveRequestResponseDTO> getRecentLeaves(UUID companyId, UUID employeeId){

        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!employee.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }
        List<LeaveRequest> requests= leaveRequestRepository
                .findTop5ByEmployee_IdOrderByCreatedAtDesc(employeeId);

        return  requests.stream().map(LeaveRequestMapper :: toDTO).toList();
    }


    /* =================================
       CANCEL LEAVE
     ================================= */

    public LeaveRequestResponseDTO cancelLeave(
            UUID companyId,
            UUID requestId) {

        LeaveRequest request = leaveRequestRepository
                .findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        if (!request.getEmployee().getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }

        if (request.getStatus() == LeaveStatus.CANCELLED) {
            throw new RuntimeException("Leave already cancelled");
        }

        if (request.getStatus() == LeaveStatus.APPROVED) {

            balanceService.restoreLeave(
                    companyId,
                    request.getEmployee().getId(),
                    request.getLeaveType().getId(),
                    request.getFromDate().getYear(),
                    request.getTotalDays().intValue()
            );
        }

        request.setStatus(LeaveStatus.CANCELLED);

        return LeaveRequestMapper.toDTO(
                leaveRequestRepository.save(request));
    }

    /* =================================
       FILTER LEAVES
     ================================= */

    public List<LeaveRequestResponseDTO> filterLeaves(
            UUID companyId,
            UUID employeeId,
            LeaveStatus status,
            LocalDate fromDate,
            LocalDate toDate) {

        List<LeaveRequest> requests =
                leaveRequestRepository
                        .findByEmployee_Company_Id(companyId);

        return requests.stream()
                .filter(r -> employeeId == null
                        || r.getEmployee().getId().equals(employeeId))
                .filter(r -> status == null
                        || r.getStatus().equals(status))
                .filter(r -> fromDate == null
                        || !r.getFromDate().isBefore(fromDate))
                .filter(r -> toDate == null
                        || !r.getToDate().isAfter(toDate))
                .map(LeaveRequestMapper::toDTO)
                .toList();
    }

    /* =================================
       CREATE APPROVAL FLOW
     ================================= */

    private void createApprovals(UUID companyId, LeaveRequest request) {

        ApprovalFlow flow =
                approvalFlowRepository
                        .findByCompany_IdAndModuleAndActiveTrue(companyId, "LEAVE")
                        .orElseThrow(() -> new RuntimeException("Approval flow not configured"));

        List<ApprovalFlowStep> steps =
                approvalFlowStepRepository
                        .findByFlow_IdOrderByLevelNumber(flow.getId());

        if (steps.isEmpty()) {
            throw new RuntimeException("Approval steps not configured");
        }

        request.setApprovalLevelMax(steps.size());
        leaveRequestRepository.save(request);

        for (ApprovalFlowStep step : steps) {

            Employee approver = resolveApprover(request.getEmployee(), step);

            LeaveApproval approval = LeaveApproval.builder()
                    .leaveRequest(request)
                    .approver(approver)
                    .approvalLevel(step.getLevelNumber())
                    .status(LeaveStatus.PENDING)
                    .build();

            leaveApprovalRepository.save(approval);
        }
    }

    /* =================================
       RESOLVE APPROVER
     ================================= */

    private Employee resolveApprover(Employee employee, ApprovalFlowStep step) {

        switch (step.getApproverType()) {

            case "MANAGER":
                if (employee.getManager() == null)
                    throw new RuntimeException("Manager not assigned");
                return employee.getManager();

            case "TEAM_LEAD":
                if (employee.getTeamLead() == null)
                    throw new RuntimeException("Team lead not assigned");
                return employee.getTeamLead();

            case "HR":
                User hrUser = userRepository
                        .findFirstByRole(Role.HR)
                        .orElseThrow(() -> new RuntimeException("HR not found"));

                return employeeRepository
                        .findByUser_Id(hrUser.getId())
                        .orElseThrow(() -> new RuntimeException("HR employee not found"));

            case "USER":
                User user = userRepository
                        .findById(step.getUserId())
                        .orElseThrow(() -> new RuntimeException("Approver user not found"));

                return employeeRepository
                        .findByUser_Id(user.getId())
                        .orElseThrow(() -> new RuntimeException("Approver employee not found"));

            default:
                throw new RuntimeException("Invalid approver type");
        }
    }

    /* =================================
       CALCULATE DAYS
     ================================= */

    private double calculateDays(LocalDate from,
                                 LocalDate to,
                                 Boolean halfDay) {

        if (halfDay != null && halfDay) {

            if (!from.equals(to)) {
                throw new RuntimeException("Half day leave must be single day");
            }

            return 0.5;
        }

        long diff = ChronoUnit.DAYS.between(from, to) + 1;

        return diff;
    }



}
