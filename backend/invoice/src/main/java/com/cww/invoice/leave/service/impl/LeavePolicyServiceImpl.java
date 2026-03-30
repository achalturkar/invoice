package com.cww.invoice.leave.service.impl;

import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.exception.exception.BadRequestException;
import com.cww.invoice.exception.exception.DuplicatePolicyException;
import com.cww.invoice.exception.exception.ResourceNotFoundException;
import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyRequestDTO;
import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyResponseDTO;
import com.cww.invoice.leave.entity.LeavePolicy;
import com.cww.invoice.leave.entity.LeaveType;
import com.cww.invoice.leave.mapper.LeavePolicyMapper;
import com.cww.invoice.leave.repository.LeavePolicyRepository;
import com.cww.invoice.leave.repository.LeaveTypeRepository;
import com.cww.invoice.leave.service.LeavePolicyService;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class LeavePolicyServiceImpl implements LeavePolicyService {

    private final LeavePolicyRepository policyRepository;
    private final CompanyRepository companyRepository;
    private final LeaveTypeRepository leaveTypeRepository;
    private final UserRepository userRepository;

    @Override
    public LeavePolicyResponseDTO create(UUID companyId, LeavePolicyRequestDTO dto) {

        if (policyRepository.existsByCompanyIdAndLeaveTypeIdAndPolicyYear(
                companyId,
                dto.getLeaveTypeId(),
                dto.getPolicyYear())) {

            throw new DuplicatePolicyException(
                    "Policy already exists for this year"
            );
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company not found"));

        LeaveType leaveType = leaveTypeRepository.findById(dto.getLeaveTypeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Leave type not found"));

        if (!leaveType.getCompany().getId().equals(companyId)) {
            throw new BadRequestException(
                    "Leave type does not belong to this company"
            );
        }

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByEmail(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        LeavePolicy policy = LeavePolicyMapper.toEntity(dto);

        policy.setCompany(company);
        policy.setLeaveType(leaveType);
        policy.setCreatedBy(user);

        return LeavePolicyMapper.toDTO(policyRepository.save(policy));
    }


    @Override
    public List<LeavePolicyResponseDTO> getAll(UUID companyId) {

        return policyRepository.findByCompanyId(companyId)
                .stream()
                .map(LeavePolicyMapper::toDTO)
                .toList();
    }

    @Override
    public LeavePolicyResponseDTO getById(UUID companyId, UUID id) {

        LeavePolicy policy = policyRepository
                .findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        return LeavePolicyMapper.toDTO(policy);
    }

    @Override
    public LeavePolicyResponseDTO update(UUID companyId, UUID id, LeavePolicyRequestDTO dto) {

        LeavePolicy policy = policyRepository
                .findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        policy.setTotalEntitlementDays(dto.getTotalEntitlementDays());
        policy.setNoticePeriodDays(dto.getNoticePeriodDays());
        policy.setMinApprovalLevel(dto.getMinApprovalLevel());
        policy.setRules(dto.getRules());
        policy.setEffectiveFrom(dto.getEffectiveFrom());
        policy.setEffectiveTo(dto.getEffectiveTo());

        return LeavePolicyMapper.toDTO(policyRepository.save(policy));
    }

    @Override
    public void delete(UUID companyId, UUID id) {

        LeavePolicy policy = policyRepository
                .findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        policyRepository.delete(policy);
    }
}
