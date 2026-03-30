package com.cww.invoice.leave.dto.ApprovalFlowStep;

import lombok.Data;

import java.util.UUID;

@Data
public class ApprovalFlowStepResponseDTO {

    private UUID id;

    private Integer levelNumber;

    private String approverType;

    private String role;

    private UUID userId;

    private UUID flowId;

}

