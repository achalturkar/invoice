package com.cww.invoice.leave.dto.leaveType;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class LeaveTypeResponseDTO {
    private UUID id;
    private String code;
    private String name;
    private String description;

    private Integer maxDaysPerYear;
    private Integer carryForwardDays;

    private Boolean requiresApproval;
    private Boolean impactsPayroll;
    private Boolean halfDayAllowed;
    private Boolean negativeBalanceAllowed;

    private Boolean isDefault;
    private Boolean isActive;

    private LocalDateTime createdAt;

}
