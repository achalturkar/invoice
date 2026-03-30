package com.cww.invoice.leave.controller;

import com.cww.invoice.leave.dto.ApprovalFlow.ApprovalFlowResponseDTO;
import com.cww.invoice.leave.dto.ApprovalFlowStep.ApprovalFlowStepResponseDTO;
import com.cww.invoice.leave.entity.ApprovalFlow;
import com.cww.invoice.leave.entity.ApprovalFlowStep;
import com.cww.invoice.leave.service.ApprovalFlowService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies/{companyId}/approval-flows")
@RequiredArgsConstructor
public class ApprovalFlowController {

    private final ApprovalFlowService approvalFlowService;

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN')")
    @PostMapping
    public ApprovalFlowResponseDTO createFlow(
            @PathVariable UUID companyId,
            @RequestBody ApprovalFlow flow){

        return approvalFlowService.createFlow(companyId, flow);
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN')")
    @PostMapping("/{flowId}/steps")
    public ApprovalFlowStepResponseDTO createStep(
            @PathVariable UUID companyId,
            @PathVariable UUID flowId,
            @RequestBody ApprovalFlowStep step){

        return approvalFlowService.createStep(companyId, flowId, step);
    }


    @GetMapping
    public List<ApprovalFlowResponseDTO> getFlows(
            @PathVariable UUID companyId){

        return approvalFlowService.getCompanyFlows(companyId);
    }

    @GetMapping("/{flowId}/steps")
    public List<ApprovalFlowStepResponseDTO> getSteps(
            @PathVariable UUID flowId){

        return approvalFlowService.getFlowSteps(flowId);
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN')")
    @DeleteMapping("/{flowId}")
    public String deleteFlow(
            @PathVariable UUID companyId,
            @PathVariable UUID flowId){

        approvalFlowService.deleteApprovalFlow(companyId, flowId);

        return "Approval flow deleted successfully";
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN')")
    @DeleteMapping("/{flowId}/steps/{stepId}")
    public String deleteStep(
            @PathVariable UUID companyId,
            @PathVariable UUID flowId,
            @PathVariable UUID stepId){

        approvalFlowService.deleteFlowStep(companyId, flowId, stepId);

        return "Approval step deleted successfully";
    }

}
