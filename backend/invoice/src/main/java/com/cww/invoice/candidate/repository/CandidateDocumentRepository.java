package com.cww.invoice.candidate.repository;

import com.cww.invoice.candidate.entity.CandidateDocument;
import com.cww.invoice.candidate.entity.enums.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CandidateDocumentRepository
        extends JpaRepository<CandidateDocument, UUID> {

    List<CandidateDocument> findByCandidateId(UUID candidateId);

    Optional<CandidateDocument>
    findByCandidateIdAndDocumentType(UUID candidateId, DocumentType type);

}

