package com.cww.invoice.leave.mapper;

import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.leave.dto.employeeBalance.EmployeeBalanceResponseDTO;
import com.cww.invoice.leave.entity.EmployeeBalance;
import com.cww.invoice.leave.entity.LeaveType;

public class EmployeeBalanceMapper {

    public static EmployeeBalance toEntity(
            Employee employee,
            LeaveType leaveType,
            Integer year,
            Integer opening
    ) {

        EmployeeBalance balance = new EmployeeBalance();

        balance.setEmployee(employee);
        balance.setLeaveType(leaveType);
        balance.setPolicyYear(year);
        balance.setOpeningBalance(opening);

        balance.calculateRemaining();

        return balance;
    }

    public static EmployeeBalanceResponseDTO toDTO(EmployeeBalance entity){

        EmployeeBalanceResponseDTO dto = new EmployeeBalanceResponseDTO();

        dto.setId(entity.getId());
        dto.setEmployeeId(entity.getEmployee().getId());

        dto.setLeaveTypeId(entity.getLeaveType().getId());
        dto.setLeaveName(entity.getLeaveType().getName());
        dto.setLeaveCode(entity.getLeaveType().getCode());

        dto.setPolicyYear(entity.getPolicyYear());

        dto.setOpeningBalance(entity.getOpeningBalance());
        dto.setCarryForwardDays(entity.getCarryForwardDays());
        dto.setTakenDays(entity.getTakenDays());
        dto.setRemainingDays(entity.getRemainingDays());
        dto.setLapsedDays(entity.getLapsedDays());

        dto.setLastUpdated(entity.getLastUpdated());

        return dto;
    }
}
