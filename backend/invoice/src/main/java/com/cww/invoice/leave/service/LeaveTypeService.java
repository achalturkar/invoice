package com.cww.invoice.leave.service;

import com.cww.invoice.leave.dto.leaveType.LeaveTypeRequestDTO;
import com.cww.invoice.leave.dto.leaveType.LeaveTypeResponseDTO;

import java.util.List;
import java.util.UUID;

public interface LeaveTypeService {

    LeaveTypeResponseDTO create(UUID companyId, LeaveTypeRequestDTO dto);

    List<LeaveTypeResponseDTO> getAll(UUID companyId);

    LeaveTypeResponseDTO getById(UUID companyId,UUID id);

    LeaveTypeResponseDTO update(UUID companyId, UUID id, LeaveTypeRequestDTO dto);

    void delete(UUID companyId,UUID id);

}
