package com.cww.invoice.leave.service.impl;

import com.cww.invoice.common.service.LeaveEmailService;
import com.cww.invoice.leave.dto.leaveApproval.LeaveApprovalRequestDTO;
import com.cww.invoice.leave.dto.leaveApproval.LeaveApprovalResponseDTO;
import com.cww.invoice.leave.entity.LeaveApproval;
import com.cww.invoice.leave.entity.LeaveRequest;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import com.cww.invoice.leave.mapper.LeaveApprovalMapper;
import com.cww.invoice.leave.repository.LeaveApprovalRepository;
import com.cww.invoice.leave.repository.LeaveRequestRepository;
import com.cww.invoice.leave.service.EmployeeBalanceService;
import com.cww.invoice.leave.service.LeaveApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LeaveApprovalServiceImpl implements LeaveApprovalService {

    private final LeaveApprovalRepository leaveapprovalRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeBalanceService employeeBalanceService;
    private final HolidayServiceImpl holidayService;
    private final LeaveEmailService leaveEmailService;


    @Override
    public LeaveApprovalResponseDTO approveLeave(
            UUID companyId,
            UUID leaveRequestId,
            UUID approverId,
            LeaveApprovalRequestDTO request){

        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveRequestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        LeaveApproval approval = leaveapprovalRepository
                .findByLeaveRequest_Id(leaveRequestId)
                .stream()
                .filter(a -> a.getApprover().getId().equals(approverId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        if(approval.getStatus() != LeaveStatus.PENDING &&
                approval.getStatus() != LeaveStatus.WAITING){
            throw new RuntimeException("Already processed");
        }

        boolean isOverride =
                !approval.getApprovalLevel()
                        .equals(leaveRequest.getApprovalLevelCurrent());

        // 🔥 OVERRIDE LOGIC
        if(isOverride){

            leaveapprovalRepository
                    .findByLeaveRequest_Id(leaveRequestId)
                    .forEach(a -> {
                        if(a.getApprovalLevel() < approval.getApprovalLevel() &&
                                a.getStatus() == LeaveStatus.PENDING){
                            a.setStatus(LeaveStatus.SKIPPED);
                        }
                    });

            leaveRequest.setApprovalLevelCurrent(approval.getApprovalLevel());
            leaveRequest.setOverrideUsed(true);
        }

        // APPROVE CURRENT
        approval.setStatus(LeaveStatus.APPROVED);
        approval.setApprovedAt(LocalDateTime.now());
        approval.setComments(request.getComments());

        if (request.getApprovedDays() != null &&
                request.getApprovedDays() > leaveRequest.getTotalDays()) {

            throw new RuntimeException("Approved days cannot exceed total days");
        }

        // 🔥 PARTIAL APPROVAL
        double approvedDays = request.getApprovedDays() != null
                ? request.getApprovedDays()
                : leaveRequest.getTotalDays();

        leaveRequest.setApprovedDays(approvedDays);




        // FINAL LEVEL
        if(approval.getApprovalLevel().equals(leaveRequest.getApprovalLevelMax())){

            leaveRequest.setStatus(LeaveStatus.APPROVED);
            leaveRequest.setFinalApprovedBy(approverId);

            employeeBalanceService.deductLeave(
                    companyId,
                    leaveRequest.getEmployee().getId(),
                    leaveRequest.getLeaveType().getId(),
                    leaveRequest.getFromDate().getYear(),
                    (int)Math.ceil(approvedDays)
            );

        } else {

            int nextLevel = approval.getApprovalLevel() + 1;
            leaveRequest.setApprovalLevelCurrent(nextLevel);

            LeaveApproval next = leaveapprovalRepository
                    .findByLeaveRequest_Id(leaveRequestId)
                    .stream()
                    .filter(a -> a.getApprovalLevel().equals(nextLevel))
                    .findFirst()
                    .orElseThrow();

            next.setStatus(LeaveStatus.PENDING);
            leaveapprovalRepository.save(next);
        }

        leaveapprovalRepository.save(approval);
        leaveRequestRepository.save(leaveRequest);

        return LeaveApprovalMapper.toDTO(approval);
    }



    @Override
    public LeaveApprovalResponseDTO rejectLeave(
            UUID companyId,
            UUID leaveRequestId,
            UUID approverId,
            LeaveApprovalRequestDTO request){

        LeaveRequest leaveRequest =
                leaveRequestRepository.findById(leaveRequestId)
                        .orElseThrow(() -> new RuntimeException("Leave request not found"));

        if(!leaveRequest.getEmployee().getCompany().getId().equals(companyId)){
            throw new RuntimeException("Unauthorized company access");
        }

        LeaveApproval approval =
                leaveapprovalRepository
                        .findByLeaveRequest_Id(leaveRequestId)
                        .stream()
                        .filter(a -> a.getApprover().getId().equals(approverId))
                        .filter(a -> a.getApprovalLevel()
                                .equals(leaveRequest.getApprovalLevelCurrent()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("You are not authorized"));

        approval.setStatus(LeaveStatus.REJECTED);
        approval.setComments(request.getComments());
        approval.setApprovedAt(LocalDateTime.now());

        leaveRequest.setStatus(LeaveStatus.REJECTED);

        leaveEmailService.sendLeaveStatusEmail(
                leaveRequest.getEmployee().getUser().getEmail(),
                leaveRequest.getEmployee().getFullName(),
                "Rejected",
                request.getComments()
        );



        leaveapprovalRepository
                .findByLeaveRequest_Id(leaveRequestId)
                .stream()
                .filter(a -> a.getStatus() == LeaveStatus.WAITING
                        || a.getStatus() == LeaveStatus.PENDING)
                .forEach(a -> {

                    if(!a.getId().equals(approval.getId())){
                        a.setStatus(LeaveStatus.REJECTED);
                        a.setComments("Auto rejected due to previous level rejection");
                    }

                });

        leaveapprovalRepository.save(approval);
        leaveRequestRepository.save(leaveRequest);

        return LeaveApprovalMapper.toDTO(approval);
    }



    @Override
    public List<LeaveApprovalResponseDTO> getPendingApprovals(
            UUID companyId,
            UUID approverId) {

        return leaveapprovalRepository
                .findByApprover_IdAndStatus(approverId, LeaveStatus.PENDING)
                .stream()
                .filter(a ->
                        a.getLeaveRequest()
                                .getEmployee()
                                .getCompany()
                                .getId()
                                .equals(companyId))
                .map(LeaveApprovalMapper::toDTO)
                .toList();
    }



    @Override
    public List<LeaveApprovalResponseDTO> getApproverHistory(
            UUID companyId,
            UUID approverId) {

        return leaveapprovalRepository
                .findByApprover_Id(approverId)
                .stream()
                .filter(a ->
                        a.getLeaveRequest()
                                .getEmployee()
                                .getCompany()
                                .getId()
                                .equals(companyId))
                .map(LeaveApprovalMapper::toDTO)
                .toList();
    }

    @Override
    public List<LeaveApprovalResponseDTO> getApprovalHistory(
            UUID companyId,
            UUID leaveRequestId) {

        return leaveapprovalRepository
                .findByLeaveRequest_Id(leaveRequestId)
                .stream()
                .filter(a ->
                        a.getLeaveRequest()
                                .getEmployee()
                                .getCompany()
                                .getId()
                                .equals(companyId))
                .map(LeaveApprovalMapper::toDTO)
                .toList();
    }

    @Override
    public LeaveRequest getLeaveRequestDetails(
            UUID companyId,
            UUID leaveRequestId) {

        LeaveRequest leaveRequest =
                leaveRequestRepository.findById(leaveRequestId)
                        .orElseThrow(() -> new RuntimeException("Leave request not found"));

        if(!leaveRequest.getEmployee()
                .getCompany()
                .getId()
                .equals(companyId)){
            throw new RuntimeException("Unauthorized access");
        }

        return leaveRequest;
    }


    @Scheduled(fixedRate = 3600000) // every hour
    public void autoEscalate() {

        List<LeaveApproval> pending =
                leaveapprovalRepository.findByStatus(LeaveStatus.PENDING);

        for (LeaveApproval approval : pending) {

            if (approval.getApprovedAt() == null &&
                    approval.getCreatedAt().plusHours(24).isBefore(LocalDateTime.now())) {

                approval.setStatus(LeaveStatus.SKIPPED);
                leaveapprovalRepository.save(approval);

                LeaveRequest request = approval.getLeaveRequest();

                int nextLevel = request.getApprovalLevelCurrent() + 1;
                request.setApprovalLevelCurrent(nextLevel);

                leaveRequestRepository.save(request);

                LeaveApproval next =
                        leaveapprovalRepository
                                .findByLeaveRequest_Id(request.getId())
                                .stream()
                                .filter(a -> a.getApprovalLevel().equals(nextLevel))
                                .findFirst()
                                .orElse(null);

                if (next != null) {
                    next.setStatus(LeaveStatus.PENDING);
                    leaveapprovalRepository.save(next);
                }
            }
        }
    }


}

