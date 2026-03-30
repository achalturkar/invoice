package com.cww.invoice.leave.service;

import com.cww.invoice.leave.dto.ApprovalFlow.ApprovalFlowResponseDTO;
import com.cww.invoice.leave.dto.ApprovalFlowStep.ApprovalFlowStepResponseDTO;
import com.cww.invoice.leave.entity.ApprovalFlow;
import com.cww.invoice.leave.entity.ApprovalFlowStep;

import java.util.List;
import java.util.UUID;

public interface ApprovalFlowService {

    ApprovalFlowResponseDTO createFlow(UUID companyId, ApprovalFlow flow);

    ApprovalFlowStepResponseDTO createStep(UUID companyId, UUID flowId, ApprovalFlowStep step);

    List<ApprovalFlowResponseDTO> getCompanyFlows(UUID companyId);

    List<ApprovalFlowStepResponseDTO> getFlowSteps(UUID flowId);

    ApprovalFlow getActiveLeaveFlow(UUID companyId);

    void deleteApprovalFlow(UUID companyId, UUID flowId);

    void deleteFlowStep(UUID companyId, UUID flowId, UUID stepId);


}
