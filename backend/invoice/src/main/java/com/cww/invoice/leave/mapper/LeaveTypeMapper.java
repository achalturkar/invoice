package com.cww.invoice.leave.mapper;

import com.cww.invoice.leave.dto.leaveType.LeaveTypeRequestDTO;
import com.cww.invoice.leave.dto.leaveType.LeaveTypeResponseDTO;
import com.cww.invoice.leave.entity.LeaveType;

public class LeaveTypeMapper {

    public static LeaveType toEntity(LeaveTypeRequestDTO dto) {
        return LeaveType.builder()
                .code(dto.getCode())
                .name(dto.getName())
                .description(dto.getDescription())
                .maxDaysPerYear(dto.getMaxDaysPerYear())
                .carryForwardDays(dto.getCarryForwardDays())
                .requiresApproval(dto.getRequiresApproval())
                .impactsPayroll(dto.getImpactsPayroll())
                .halfDayAllowed(dto.getHalfDayAllowed())
                .negativeBalanceAllowed(dto.getNegativeBalanceAllowed())
                .build();
    }

    public static LeaveTypeResponseDTO toDTO(LeaveType entity) {
        return LeaveTypeResponseDTO.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .name(entity.getName())
                .description(entity.getDescription())
                .maxDaysPerYear(entity.getMaxDaysPerYear())
                .carryForwardDays(entity.getCarryForwardDays())
                .requiresApproval(entity.getRequiresApproval())
                .impactsPayroll(entity.getImpactsPayroll())
                .halfDayAllowed(entity.getHalfDayAllowed())
                .negativeBalanceAllowed(entity.getNegativeBalanceAllowed())
                .isDefault(entity.getIsDefault())
                .isActive(entity.getIsActive())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
