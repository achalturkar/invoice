package com.cww.invoice.leave.dto.leaveApproval;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class LeaveApprovalResponseDTO {
    private UUID id;

    private UUID leaveRequestId;


    private UUID approverId;

    private Double approvedDays;
    private Boolean isCurrentLevel;
    private Boolean canApprove;


    private Integer approvalLevel;

    private String status;

    private String comments;

    private LocalDateTime approvedAt;

    private UUID employeeId;

    private String employeeName;

    // ===============================
    // LEAVE INFO
    // ===============================

    private String leaveType;

    private LocalDate fromDate;

    private LocalDate toDate;

    private Integer days;

    private String reason;
}
