package com.cww.invoice.leave.mapper;

import com.cww.invoice.leave.dto.ApprovalFlow.ApprovalFlowDTO;
import com.cww.invoice.leave.dto.ApprovalFlow.ApprovalFlowResponseDTO;
import com.cww.invoice.leave.dto.ApprovalFlowStep.ApprovalFlowStepResponseDTO;
import com.cww.invoice.leave.entity.ApprovalFlow;
import com.cww.invoice.leave.entity.ApprovalFlowStep;
import org.springframework.stereotype.Component;
@Component
public class ApprovalFlowMapper {

    public ApprovalFlowResponseDTO mapToDTO(ApprovalFlow flow){

        ApprovalFlowResponseDTO dto = new ApprovalFlowResponseDTO();

        dto.setId(flow.getId());
        dto.setModule(flow.getModule());
        dto.setName(flow.getName());
        dto.setActive(flow.getActive());
        dto.setCompanyId(flow.getCompany().getId());

        return dto;
    }

    public ApprovalFlowStepResponseDTO toDTO(ApprovalFlowStep step){

        ApprovalFlowStepResponseDTO dto = new ApprovalFlowStepResponseDTO();

        dto.setId(step.getId());
        dto.setLevelNumber(step.getLevelNumber());
        dto.setApproverType(step.getApproverType());
        dto.setRole(step.getRole());
        dto.setUserId(step.getUserId());
        dto.setFlowId(step.getFlow().getId());

        return dto;
    }

}