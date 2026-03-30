package com.cww.invoice.employee.controller;

import com.cww.invoice.employee.dto.*;
import com.cww.invoice.employee.entity.enums.*;
import com.cww.invoice.employee.services.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/companies/{companyId}/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService service;

//    @PostMapping
//    public EmployeeResponseDto create(
//            @PathVariable UUID companyId,
//            @RequestBody EmployeeRequestDto dto
//    ) {
//        return service.create(companyId, dto);
//    }

    @PreAuthorize("hasAnyRole('COMPANY_ADMIN','HR')")
    @PostMapping
    public ResponseEntity<EmployeeResponseDto> create(
            @RequestBody EmployeeRequestDto request) {

        return ResponseEntity.ok(service.createEmployee(request));
    }


    @GetMapping
    public List<EmployeeResponseDto> getAll(@PathVariable UUID companyId) {
        return service.getAll(companyId);
    }

    @GetMapping("/{id}")
    public EmployeeResponseDto getById(
            @PathVariable UUID companyId,
            @PathVariable UUID id
    ) {
        return service.getById(companyId, id);
    }

    @GetMapping("/user/{id}")
    public EmployeeResponseDto getByUserId(
            @PathVariable UUID companyId,
            @PathVariable UUID id
    ) {
        return service.getByUserId(companyId, id);
    }



    @PutMapping("/{id}")
    public EmployeeResponseDto update(
            @PathVariable UUID companyId,
            @PathVariable UUID id,
            @RequestBody EmployeeRequestDto dto
    ) {
        return service.update(companyId, id, dto);
    }

    @DeleteMapping("/{id}")
    public void deactivate(
            @PathVariable UUID companyId,
            @PathVariable UUID id
    ) {
        service.deactivate(companyId, id);
    }

    /* DOCUMENTS */

    @PostMapping("/{candidateId}/documents")
    public EmployeeDocumentDto upload(
            @PathVariable UUID companyId,
            @PathVariable UUID candidateId,
            @RequestParam DocumentType type,
            @RequestParam MultipartFile file
    ) {
        return service.uploadDocument(companyId, candidateId, type, file);
    }

    @GetMapping("/{candidateId}/documents")
    public List<EmployeeDocumentDto> documents(
            @PathVariable UUID companyId,
            @PathVariable UUID candidateId
    ) {
        return service.getDocuments(companyId, candidateId);
    }

    @PutMapping("/documents/{docId}/verify")
    public void verify(
            @PathVariable UUID docId,
            @RequestParam VerificationStatus status,
            @RequestParam(required = false) String remarks
    ) {
        service.verifyDocument(docId, status, remarks);
    }
}
