package com.cww.invoice.leave.dto.ApprovalFlowStep;

import lombok.Data;

import java.util.UUID;

@Data
public class ApprovalFlowStepDTO {

    private UUID id;

    private UUID flowId;

    private Integer levelNumber;

    private String approverType;

    private String role;

    private UUID userId;

}
