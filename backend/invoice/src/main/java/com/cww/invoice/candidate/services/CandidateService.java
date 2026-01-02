package com.cww.invoice.candidate.services;

import com.cww.invoice.candidate.dto.*;
import com.cww.invoice.candidate.entity.*;
import com.cww.invoice.candidate.entity.enums.*;
import com.cww.invoice.candidate.repository.*;
import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepo;
    private final CandidateDocumentRepository documentRepo;
    private final CompanyRepository companyRepo;
    private final StorageService storageService;

    @Value("${app.storage.candidate}")
    private String baseFolder;

    /* ================= CANDIDATE ================= */

    public CandidateResponseDto create(UUID companyId, CandidateRequestDto dto) {
        Company company = companyRepo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Candidate c = new Candidate();
        c.setCompany(company);
        c.setStatus(CandidateStatus.ACTIVE);
        mapCandidate(c, dto);

        candidateRepo.save(c);
        return mapToDto(c);
    }

    public List<CandidateResponseDto> getAll(UUID companyId) {
        return candidateRepo.findByCompanyId(companyId)
                .stream().map(this::mapToDto).toList();
    }

    public CandidateResponseDto getById(UUID companyId, UUID id) {
        Candidate c = candidateRepo.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        return mapToDto(c);
    }

    public CandidateResponseDto update(UUID companyId, UUID id, CandidateRequestDto dto) {
        Candidate c = candidateRepo.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        mapCandidate(c, dto);
        candidateRepo.save(c);
        return mapToDto(c);
    }

    public void deactivate(UUID companyId, UUID id) {
        Candidate c = candidateRepo.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        c.setStatus(CandidateStatus.INACTIVE);
        candidateRepo.save(c);
    }

    /* ================= DOCUMENT ================= */

    public CandidateDocumentDto uploadDocument(
            UUID companyId,
            UUID candidateId,
            DocumentType type,
            MultipartFile file
    ) {
        Candidate candidate = candidateRepo
                .findByIdAndCompanyId(candidateId, companyId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        documentRepo.findByCandidateIdAndDocumentType(candidateId, type)
                .ifPresent(d -> {
                    throw new RuntimeException(type + " already uploaded");
                });

        String folder = baseFolder + "/" + candidateId + "/" + type.name().toLowerCase();
        String url = storageService.upload(file, folder);


        CandidateDocument doc = new CandidateDocument();
        doc.setCandidate(candidate);
        doc.setDocumentType(type);
        doc.setDocumentUrl(url);
        doc.setVerificationStatus(VerificationStatus.PENDING);

        documentRepo.save(doc);
        return mapDoc(doc);
    }

    public List<CandidateDocumentDto> getDocuments(UUID companyId, UUID candidateId) {
        candidateRepo.findByIdAndCompanyId(candidateId, companyId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        return documentRepo.findByCandidateId(candidateId)
                .stream().map(this::mapDoc).toList();
    }

    public void verifyDocument(UUID documentId, VerificationStatus status, String remarks) {
        CandidateDocument doc = documentRepo.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        doc.setVerificationStatus(status);
        doc.setRemarks(remarks);
        documentRepo.save(doc);
    }

    /* ================= MAPPERS ================= */

    private void mapCandidate(Candidate c, CandidateRequestDto dto) {
        c.setFullName(dto.getFullName());
        c.setEmail(dto.getEmail());
        c.setPhone(dto.getPhone());
        c.setSkills(dto.getSkills());
        c.setExperienceYears(dto.getExperienceYears());
        c.setEmploymentType(dto.getEmploymentType());
    }

    private CandidateResponseDto mapToDto(Candidate c) {
        CandidateResponseDto dto = new CandidateResponseDto();
        dto.setId(c.getId());
        dto.setFullName(c.getFullName());
        dto.setEmail(c.getEmail());
        dto.setPhone(c.getPhone());
        dto.setSkills(c.getSkills());
        dto.setExperienceYears(c.getExperienceYears());
        dto.setEmploymentType(c.getEmploymentType());
        dto.setStatus(c.getStatus());
        return dto;
    }

    private CandidateDocumentDto mapDoc(CandidateDocument d) {
        CandidateDocumentDto dto = new CandidateDocumentDto();
        dto.setId(d.getId());
        dto.setDocumentType(d.getDocumentType());
        dto.setDocumentUrl(d.getDocumentUrl());
        dto.setVerificationStatus(d.getVerificationStatus());
        dto.setRemarks(d.getRemarks());
        return dto;
    }
}
