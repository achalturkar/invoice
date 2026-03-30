package com.cww.invoice.leave.service;

import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyRequestDTO;
import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyResponseDTO;

import java.util.List;
import java.util.UUID;

public interface LeavePolicyService {
     LeavePolicyResponseDTO create(UUID companyId, LeavePolicyRequestDTO dto);

     List<LeavePolicyResponseDTO> getAll(UUID companyId);

     LeavePolicyResponseDTO getById(UUID companyId, UUID id);

    LeavePolicyResponseDTO update(UUID companyId, UUID id, LeavePolicyRequestDTO dto);

    void delete(UUID companyId, UUID id);


    }
