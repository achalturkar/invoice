package com.cww.invoice.leave.service.impl;

import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.leave.dto.leaveType.LeaveTypeRequestDTO;
import com.cww.invoice.leave.dto.leaveType.LeaveTypeResponseDTO;
import com.cww.invoice.leave.entity.ApprovalFlow;
import com.cww.invoice.leave.entity.ApprovalFlowStep;
import com.cww.invoice.leave.entity.LeaveType;
import com.cww.invoice.leave.mapper.LeaveTypeMapper;
import com.cww.invoice.leave.repository.ApprovalFlowRepository;
import com.cww.invoice.leave.repository.ApprovalFlowStepRepository;
import com.cww.invoice.leave.repository.LeaveTypeRepository;
import com.cww.invoice.leave.service.LeaveTypeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class LeaveTypeServiceImpl implements LeaveTypeService {

    private final LeaveTypeRepository leaveTypeRepository;
    private final CompanyRepository companyRepository;
    private  final ApprovalFlowStepRepository approvalFlowStepRepository;
    private final ApprovalFlowRepository approvalFlowRepository;

    // ---------------------------------------
    // CREATE
    // ---------------------------------------
    @Override
    public LeaveTypeResponseDTO create(UUID companyId, LeaveTypeRequestDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        if (leaveTypeRepository.existsByCompanyIdAndCode(companyId, dto.getCode())) {
            throw new RuntimeException("Leave code already exists for this company");
        }

        ApprovalFlow flow =
                approvalFlowRepository
                        .findByCompany_IdAndModuleAndActiveTrue(companyId, "LEAVE")
                        .orElseThrow(() -> new RuntimeException("Approval flow not configured"));

        List<ApprovalFlowStep> steps =
                approvalFlowStepRepository
                        .findByFlow_IdOrderByLevelNumber(flow.getId());

        LeaveType entity = LeaveTypeMapper.toEntity(dto);

        entity.setCompany(company);
        entity.setIsDefault(false);
        entity.setIsActive(true);

        return LeaveTypeMapper.toDTO(leaveTypeRepository.save(entity));
    }

    // ---------------------------------------
    // GET ALL (Company Safe)
    // ---------------------------------------
    @Override
    public List<LeaveTypeResponseDTO> getAll(UUID companyId) {

        return leaveTypeRepository.findByCompanyId(companyId)
                .stream()
                .map(LeaveTypeMapper::toDTO)
                .toList();
    }

    // ---------------------------------------
    // GET BY ID (Company Safe)
    // ---------------------------------------
    @Override
    public LeaveTypeResponseDTO getById(UUID companyId, UUID id) {

        LeaveType entity = leaveTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave type not found"));

        if (entity.getCompany() == null ||
                !entity.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Unauthorized access");
        }

        return LeaveTypeMapper.toDTO(entity);
    }

    // ---------------------------------------
    // UPDATE (Company + Default Protected)
    // ---------------------------------------
    @Override
    public LeaveTypeResponseDTO update(UUID companyId, UUID id, LeaveTypeRequestDTO dto) {

        LeaveType entity = leaveTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave type not found"));

        if (entity.getCompany() == null ||
                !entity.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Unauthorized access");
        }

        if (entity.getIsDefault()) {
            throw new RuntimeException("Default leave type cannot be modified");
        }

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setMaxDaysPerYear(dto.getMaxDaysPerYear());
        entity.setCarryForwardDays(dto.getCarryForwardDays());
        entity.setRequiresApproval(dto.getRequiresApproval());
        entity.setImpactsPayroll(dto.getImpactsPayroll());
        entity.setHalfDayAllowed(dto.getHalfDayAllowed());
        entity.setNegativeBalanceAllowed(dto.getNegativeBalanceAllowed());

        return LeaveTypeMapper.toDTO(leaveTypeRepository.save(entity));
    }

    // ---------------------------------------
    // DELETE (Company + Default Protected)
    // ---------------------------------------
    @Override
    public void delete(UUID companyId, UUID id) {

        LeaveType entity = leaveTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave type not found"));

        if (entity.getCompany() == null ||
                !entity.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("Unauthorized access");
        }

        if (entity.getIsDefault()) {
            throw new RuntimeException("Default leave type cannot be deleted");
        }

        leaveTypeRepository.delete(entity);
    }
}
