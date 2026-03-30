package com.cww.invoice.leave.dto.leavePolicy;


import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class LeavePolicyRequestDTO {
    private UUID leaveTypeId;

    private Integer policyYear;

    private Integer totalEntitlementDays;

    private Integer noticePeriodDays;

    private Integer minApprovalLevel;

    private String rules;

    private LocalDate effectiveFrom;

    private LocalDate effectiveTo;
}
