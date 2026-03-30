package com.cww.invoice.leave.service;

import com.cww.invoice.leave.dto.employeeBalance.EmployeeBalanceResponseDTO;

import java.util.List;
import java.util.UUID;

public interface EmployeeBalanceService {

    EmployeeBalanceResponseDTO createBalance(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year);


    EmployeeBalanceResponseDTO deductLeave(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year,
            Integer days);

    void restoreLeave(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year,
            Integer days);

    EmployeeBalanceResponseDTO getBalance(
            UUID companyId,
            UUID employeeId,
            UUID leaveTypeId,
            Integer year);

    List<EmployeeBalanceResponseDTO> getAllByUser(
            UUID companyId,
            UUID employeeId,
            Integer year);

    EmployeeBalanceResponseDTO updateBalance(
            UUID companyId,
            UUID balanceId,
            Integer openingBalance,
            Integer carryForwardDays,
            Integer lapsedDays);

    void deleteBalance(UUID companyId, UUID employeeId, UUID balanceId);
}