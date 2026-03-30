package com.cww.invoice.leave.mapper;

import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyRequestDTO;
import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyResponseDTO;
import com.cww.invoice.leave.entity.LeavePolicy;

public class LeavePolicyMapper {

    public static LeavePolicy toEntity(LeavePolicyRequestDTO dto) {

        LeavePolicy policy = new LeavePolicy();

        policy.setPolicyYear(dto.getPolicyYear());
        policy.setTotalEntitlementDays(dto.getTotalEntitlementDays());
        policy.setNoticePeriodDays(dto.getNoticePeriodDays());
        policy.setMinApprovalLevel(dto.getMinApprovalLevel());
        policy.setRules(dto.getRules());
        policy.setEffectiveFrom(dto.getEffectiveFrom());
        policy.setEffectiveTo(dto.getEffectiveTo());

        return policy;
    }

    public static LeavePolicyResponseDTO toDTO(LeavePolicy entity) {

        return LeavePolicyResponseDTO.builder()
                .id(entity.getId())
                .leaveTypeId(entity.getLeaveType().getId())
                .leaveTypeName(entity.getLeaveType().getName())
                .leaveTypeCode(entity.getLeaveType().getCode())
                .policyYear(entity.getPolicyYear())
                .totalEntitlementDays(entity.getTotalEntitlementDays())
                .noticePeriodDays(entity.getNoticePeriodDays())
                .minApprovalLevel(entity.getMinApprovalLevel())
                .rules(entity.getRules())
                .effectiveFrom(entity.getEffectiveFrom())
                .effectiveTo(entity.getEffectiveTo())
                .createdBy(entity.getCreatedBy() != null
                        ? entity.getCreatedBy().getId()
                        : null)
                .createdName(entity.getCreatedBy() != null
                        ? entity.getCreatedBy().getName()
                        : null)

                .createdAt(entity.getCreatedAt())
                .build();
    }
}
