package com.cww.invoice.leave.dto.ApprovalFlow;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ApprovalFlowResponseDTO {

    private UUID id;

    private String module;

    private String name;

    private Boolean active;

    private UUID companyId;

}

