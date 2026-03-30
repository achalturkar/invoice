package com.cww.invoice.leave.controller;

import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyRequestDTO;
import com.cww.invoice.leave.dto.leavePolicy.LeavePolicyResponseDTO;
import com.cww.invoice.leave.service.LeavePolicyService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/companies/{companyId}/leave-policies")
public class LeavePolicyController {

    private final LeavePolicyService service;

    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR')")
    @PostMapping
    public ResponseEntity<LeavePolicyResponseDTO> create(
            @PathVariable UUID companyId,
            @RequestBody LeavePolicyRequestDTO dto) {

        return ResponseEntity.ok(service.create(companyId, dto));
    }

    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR','EMPLOYEE')")
    @GetMapping
    public ResponseEntity<List<LeavePolicyResponseDTO>> getAll(
            @PathVariable UUID companyId) {

        return ResponseEntity.ok(service.getAll(companyId));
    }

    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR','EMPLOYEE')")
    @GetMapping("/{id}")
    public ResponseEntity<LeavePolicyResponseDTO> getById(
            @PathVariable UUID companyId,
            @PathVariable UUID id) {

        return ResponseEntity.ok(service.getById(companyId, id));
    }

    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR')")
    @PutMapping("/{id}")
    public ResponseEntity<LeavePolicyResponseDTO> update(
            @PathVariable UUID companyId,
            @PathVariable UUID id,
            @RequestBody LeavePolicyRequestDTO dto) {

        return ResponseEntity.ok(service.update(companyId, id, dto));
    }

    @PreAuthorize("hasRole('COMPANY_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID companyId,
            @PathVariable UUID id) {

        service.delete(companyId, id);
        return ResponseEntity.noContent().build();
    }
}

