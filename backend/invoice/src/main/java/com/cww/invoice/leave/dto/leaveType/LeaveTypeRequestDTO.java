package com.cww.invoice.leave.dto.leaveType;

import lombok.Data;

@Data
public class LeaveTypeRequestDTO {
    private String code;
    private String name;
    private String description;

    private Integer maxDaysPerYear;
    private Integer carryForwardDays;

    private Boolean requiresApproval;
    private Boolean impactsPayroll;

    private Boolean halfDayAllowed;
    private Boolean negativeBalanceAllowed;
}
