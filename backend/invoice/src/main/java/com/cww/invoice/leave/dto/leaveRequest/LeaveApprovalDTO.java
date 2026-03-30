package com.cww.invoice.leave.dto.leaveRequest;

import lombok.Data;

@Data
public class LeaveApprovalDTO {
    private Boolean approved;
    private String comment;
}

