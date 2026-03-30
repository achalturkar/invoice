package com.cww.invoice.leave.dto.leaveApproval;

import lombok.Data;

import java.util.UUID;

@Data
public class LeaveApprovalRequestDTO {

    private String comments;

    private Double approvedDays;


}
