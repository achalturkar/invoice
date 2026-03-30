package com.cww.invoice.leave.dto.ApprovalFlow;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Data
@Getter
@Setter
public class ApprovalFlowDTO {

    private UUID id;

    private UUID companyId;

    private String module;

    private String name;

    private Boolean active;

}

