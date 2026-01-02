package com.cww.invoice.candidate.controller;

import com.cww.invoice.candidate.dto.*;
import com.cww.invoice.candidate.entity.enums.*;
import com.cww.invoice.candidate.services.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/company/{companyId}/candidates")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateService service;

    @PostMapping
    public CandidateResponseDto create(
            @PathVariable UUID companyId,
            @RequestBody CandidateRequestDto dto
    ) {
        return service.create(companyId, dto);
    }

    @GetMapping
    public List<CandidateResponseDto> getAll(@PathVariable UUID companyId) {
        return service.getAll(companyId);
    }

    @GetMapping("/{id}")
    public CandidateResponseDto getById(
            @PathVariable UUID companyId,
            @PathVariable UUID id
    ) {
        return service.getById(companyId, id);
    }

    @PutMapping("/{id}")
    public CandidateResponseDto update(
            @PathVariable UUID companyId,
            @PathVariable UUID id,
            @RequestBody CandidateRequestDto dto
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
    public CandidateDocumentDto upload(
            @PathVariable UUID companyId,
            @PathVariable UUID candidateId,
            @RequestParam DocumentType type,
            @RequestParam MultipartFile file
    ) {
        return service.uploadDocument(companyId, candidateId, type, file);
    }

    @GetMapping("/{candidateId}/documents")
    public List<CandidateDocumentDto> documents(
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
