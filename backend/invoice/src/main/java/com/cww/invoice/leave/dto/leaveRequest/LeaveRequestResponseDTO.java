package com.cww.invoice.leave.dto.leaveRequest;

import com.cww.invoice.leave.dto.leaveApproval.ApprovalDTO;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class LeaveRequestResponseDTO {

    private UUID id;
    private UUID employeeId;
    private String employeeName;
    private UUID leaveTypeId;
    private String leaveTypeName;
    private String leaveTypeCode;

    private LocalDate fromDate;
    private LocalDate toDate;
    private Double totalDays;
    private Boolean halfDay;

    private String reason;
    private Long contact;
    private String filePath;
    private LeaveStatus status;

    private Integer approvalLevelCurrent;
    private Integer approvalLevelMax;

    private Boolean payrollExported;
    private LocalDateTime createdAt;
    private LocalDateTime submittedAt;

    private Double approvedDays;
    private UUID finalApprovedBy;
    private Boolean overrideUsed;


    private List<ApprovalDTO> approvals;

}
