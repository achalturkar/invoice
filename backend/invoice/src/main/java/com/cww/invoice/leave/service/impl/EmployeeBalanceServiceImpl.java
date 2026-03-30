package com.cww.invoice.leave.service.impl;

import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.employee.repository.EmployeeRepository;
import com.cww.invoice.leave.dto.employeeBalance.EmployeeBalanceResponseDTO;
import com.cww.invoice.leave.entity.EmployeeBalance;
import com.cww.invoice.leave.entity.LeaveType;
import com.cww.invoice.leave.mapper.EmployeeBalanceMapper;
import com.cww.invoice.leave.repository.EmployeeBalanceRepository;
import com.cww.invoice.leave.repository.LeaveTypeRepository;
import com.cww.invoice.leave.service.EmployeeBalanceService;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeBalanceServiceImpl implements EmployeeBalanceService {

    private final EmployeeBalanceRepository repository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final EmployeeRepository employeeRepository;

    /* ================= HELPER ================= */

    private Employee getEmployee(UUID employeeId) {

        return employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    private Employee validateCompany(UUID companyId, UUID employeeId) {

        Employee employee = getEmployee(employeeId);

        if (!employee.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }

        return employee;
    }

    /* ================= CREATE ================= */

    @Override
    public EmployeeBalanceResponseDTO createBalance(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year) {

        Employee employee = validateCompany(companyId, employeeId);

        LeaveType leaveType = leaveTypeRepository.findById(leaveTypeId)
                .orElseThrow(() -> new RuntimeException("Leave type not found"));

        repository
                .findByEmployee_IdAndLeaveType_IdAndPolicyYear(
                        employee.getId(),
                        leaveTypeId,
                        year
                )
                .ifPresent(b -> {
                    throw new RuntimeException("Balance already exists");
                });

        EmployeeBalance balance = new EmployeeBalance();

        balance.setEmployee(employee);
        balance.setLeaveType(leaveType);
        balance.setPolicyYear(year);

        balance.setOpeningBalance(leaveType.getMaxDaysPerYear());
        balance.setCarryForwardDays(leaveType.getCarryForwardDays());
        balance.setTakenDays(0);
        balance.setLapsedDays(0);

        balance.calculateRemaining();

        return EmployeeBalanceMapper.toDTO(repository.save(balance));
    }

    /* ================= DEDUCT ================= */

    @Override
    public EmployeeBalanceResponseDTO deductLeave(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year,
            Integer days) {

        Employee employee = validateCompany(companyId, employeeId);

        EmployeeBalance balance = repository
                .findByEmployee_IdAndLeaveType_IdAndPolicyYear(
                        employee.getId(),
                        leaveTypeId,
                        year
                )
                .orElseThrow(() -> new RuntimeException("Balance not found"));

        LeaveType leaveType = leaveTypeRepository.findById(leaveTypeId)
                .orElseThrow();

        if (!leaveType.getNegativeBalanceAllowed()
                && balance.getRemainingDays() < days) {

            throw new RuntimeException("Insufficient leave balance");
        }

        balance.setTakenDays(balance.getTakenDays() + days);

        balance.calculateRemaining();

        return EmployeeBalanceMapper.toDTO(repository.save(balance));
    }

    /* ================= RESTORE ================= */

    @Override
    public void restoreLeave(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year,
            Integer days) {

        Employee employee = validateCompany(companyId, employeeId);

        EmployeeBalance balance = repository
                .findByEmployee_IdAndLeaveType_IdAndPolicyYear(
                        employee.getId(),
                        leaveTypeId,
                        year
                )
                .orElseThrow(() -> new RuntimeException("Balance not found"));

        balance.setTakenDays(balance.getTakenDays() - days);

        if (balance.getTakenDays() < 0) {
            balance.setTakenDays(0);
        }

        balance.calculateRemaining();

        repository.save(balance);
    }

    /* ================= GET SINGLE ================= */

    @Override
    public EmployeeBalanceResponseDTO getBalance(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year) {

        Employee employee = validateCompany(companyId, employeeId);

        EmployeeBalance balance = repository
                .findByEmployee_IdAndLeaveType_IdAndPolicyYear(
                        employee.getId(),
                        leaveTypeId,
                        year
                )
                .orElseThrow(() -> new RuntimeException("Balance not found"));

        return EmployeeBalanceMapper.toDTO(balance);
    }

    /* ================= GET ALL ================= */

    @Override
    public List<EmployeeBalanceResponseDTO> getAllByUser(
            UUID companyId,
            UUID employeeId,
            Integer year) {

        Employee employee = validateCompany(companyId, employeeId);

        return repository
                .findByEmployee_Id(employee.getId())
                .stream()
                .filter(b -> b.getPolicyYear().equals(year))
                .map(EmployeeBalanceMapper::toDTO)
                .toList();
    }

    /* ================= UPDATE ================= */

    @Override
    public EmployeeBalanceResponseDTO updateBalance(
            UUID companyId,
            UUID balanceId,
            Integer openingBalance,
            Integer carryForwardDays,
            Integer lapsedDays) {

        EmployeeBalance balance = repository.findById(balanceId)
                .orElseThrow(() -> new RuntimeException("Balance not found"));

        if (!balance.getEmployee().getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Invalid company access");
        }

        if (openingBalance != null)
            balance.setOpeningBalance(openingBalance);

        if (carryForwardDays != null)
            balance.setCarryForwardDays(carryForwardDays);

        if (lapsedDays != null)
            balance.setLapsedDays(lapsedDays);

        balance.calculateRemaining();

        return EmployeeBalanceMapper.toDTO(repository.save(balance));
    }

    /* ================= DELETE ================= */

    @Override
    public void deleteBalance(UUID companyId, UUID employeeId, UUID balanceId) {

        Employee employee = validateCompany(companyId, employeeId);

        EmployeeBalance balance = repository.findById(balanceId)
                .orElseThrow(() -> new RuntimeException("Balance not found"));

        if (!balance.getEmployee().getId().equals(employee.getId())) {
            throw new RuntimeException("Balance does not belong to this employee");
        }

        repository.delete(balance);
    }
}
