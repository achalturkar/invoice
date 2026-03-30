package com.cww.invoice.leave.dto.leaveApproval;

import com.cww.invoice.user.entity.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApprovalDTO {

    private String approverName;
    private Role role; // Manager / TL / HR
    private Integer level;
    private String status;
    private String comment;
    private LocalDateTime actionDate;
}

