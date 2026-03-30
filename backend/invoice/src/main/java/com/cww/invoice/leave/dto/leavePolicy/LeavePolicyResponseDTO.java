package com.cww.invoice.leave.dto.leavePolicy;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class LeavePolicyResponseDTO {
    private UUID id;

    private UUID leaveTypeId;
    private String leaveTypeName;
    private String leaveTypeCode;

    private Integer policyYear;
    private Integer totalEntitlementDays;

    private Integer noticePeriodDays;
    private Integer minApprovalLevel;

    private String rules;

    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;

    private UUID createdBy;
    private String createdName;

    private LocalDateTime createdAt;
}
