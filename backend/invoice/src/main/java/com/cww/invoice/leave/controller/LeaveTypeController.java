package com.cww.invoice.leave.controller;

import com.cww.invoice.leave.dto.leaveType.LeaveTypeRequestDTO;
import com.cww.invoice.leave.dto.leaveType.LeaveTypeResponseDTO;
import com.cww.invoice.leave.service.LeaveTypeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/companies/{companyId}/leave-types")
public class LeaveTypeController {

    private final LeaveTypeService service;

    // ---------------------------------------
    // CREATE
    // ---------------------------------------
//    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR')")
    @PostMapping
    public ResponseEntity<LeaveTypeResponseDTO> create(
            @PathVariable UUID companyId,
            @RequestBody LeaveTypeRequestDTO dto) {

        return ResponseEntity.ok(service.create(companyId, dto));
    }

    // ---------------------------------------
    // GET ALL
    // ---------------------------------------
    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR','EMPLOYEE')")
    @GetMapping
    public ResponseEntity<List<LeaveTypeResponseDTO>> getAll(
            @PathVariable UUID companyId) {

        return ResponseEntity.ok(service.getAll(companyId));
    }

    // ---------------------------------------
    // GET BY ID
    // ---------------------------------------
    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR','EMPLOYEE')")
    @GetMapping("/{id}")
    public ResponseEntity<LeaveTypeResponseDTO> getById(
            @PathVariable UUID companyId,
            @PathVariable UUID id) {

        return ResponseEntity.ok(service.getById(companyId, id));
    }

    // ---------------------------------------
    // UPDATE
    // ---------------------------------------
    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR')")
    @PutMapping("/{id}")
    public ResponseEntity<LeaveTypeResponseDTO> update(
            @PathVariable UUID companyId,
            @PathVariable UUID id,
            @RequestBody LeaveTypeRequestDTO dto) {

        return ResponseEntity.ok(service.update(companyId, id, dto));
    }

    // ---------------------------------------
    // DELETE
    // ---------------------------------------
    @PreAuthorize("hasRole('COMPANY_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID companyId,
            @PathVariable UUID id) {

        service.delete(companyId, id);
        return ResponseEntity.noContent().build();
    }
}
