package com.cww.invoice.leave.service.impl;

import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.leave.dto.ApprovalFlow.ApprovalFlowResponseDTO;
import com.cww.invoice.leave.dto.ApprovalFlowStep.ApprovalFlowStepResponseDTO;
import com.cww.invoice.leave.entity.ApprovalFlow;
import com.cww.invoice.leave.entity.ApprovalFlowStep;
import com.cww.invoice.leave.mapper.ApprovalFlowMapper;
import com.cww.invoice.leave.repository.ApprovalFlowRepository;
import com.cww.invoice.leave.repository.ApprovalFlowStepRepository;
import com.cww.invoice.leave.service.ApprovalFlowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApprovalFlowServiceImpl implements ApprovalFlowService {

    private final ApprovalFlowRepository flowRepository;
    private final ApprovalFlowStepRepository stepRepository;
    private final CompanyRepository companyRepository;
    private final ApprovalFlowMapper flowMapper;

    @Override
    public ApprovalFlowResponseDTO createFlow(UUID companyId, ApprovalFlow flow) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        boolean activeExists =
                flowRepository.existsByCompany_IdAndModuleAndActiveTrue(
                        companyId,
                        flow.getModule()
                );

        if(activeExists && flow.getActive()){
            throw new RuntimeException(
                    "Active approval flow already exists for module: "
                            + flow.getModule()
            );
        }

        flow.setCompany(company);
        flow.setCreatedAt(LocalDateTime.now());

        ApprovalFlow saved = flowRepository.save(flow);

        return flowMapper.mapToDTO(saved);
    }

    @Override
    public ApprovalFlowStepResponseDTO createStep( UUID companyId, UUID flowId, ApprovalFlowStep step) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));


        ApprovalFlow flow = flowRepository.findById(flowId)
                .orElseThrow(() -> new RuntimeException("Flow not found"));

        boolean levelExists =
                stepRepository.existsByFlow_IdAndLevelNumber(
                        flowId,
                        step.getLevelNumber()
                );

        if(levelExists){
            throw new RuntimeException(
                    "Level " + step.getLevelNumber() +
                            " already exists for this approval flow"
            );
        }

        step.setFlow(flow);
        step.setCreatedAt(LocalDateTime.now());

        ApprovalFlowStep saved = stepRepository.save(step);

        return flowMapper.toDTO(saved);
    }

    @Override
    public List<ApprovalFlowResponseDTO> getCompanyFlows(UUID companyId) {

        List<ApprovalFlow> flows = flowRepository.findByCompany_Id(companyId);

        return flows.stream()
                .map(flowMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ApprovalFlowStepResponseDTO> getFlowSteps(UUID flowId) {

        List<ApprovalFlowStep> steps =
                stepRepository.findByFlow_IdOrderByLevelNumber(flowId);

        return steps.stream()
                .map(flowMapper:: toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ApprovalFlow getActiveLeaveFlow(UUID companyId) {

        return flowRepository
                .findByCompany_IdAndModuleAndActiveTrue(companyId, "LEAVE")
                .orElseThrow(() -> new RuntimeException("Leave flow not configured"));
    }

    @Override
    public void deleteApprovalFlow(UUID companyId, UUID flowId) {

        ApprovalFlow flow = flowRepository
                .findById(flowId)
                .orElseThrow(() -> new RuntimeException("Approval flow not found"));

        if(!flow.getCompany().getId().equals(companyId)){
            throw new RuntimeException("Flow does not belong to this company");
        }

        // delete steps first
        stepRepository.deleteByFlow_Id(flowId);

        // delete flow
        flowRepository.delete(flow);
    }


    @Override
    public void deleteFlowStep(UUID companyId, UUID flowId, UUID stepId) {

        ApprovalFlowStep step = stepRepository
                .findById(stepId)
                .orElseThrow(() -> new RuntimeException("Step not found"));

        if(!step.getFlow().getId().equals(flowId)){
            throw new RuntimeException("Step does not belong to this flow");
        }

        if(!step.getFlow().getCompany().getId().equals(companyId)){
            throw new RuntimeException("Unauthorized operation");
        }

        stepRepository.delete(step);
    }

}
