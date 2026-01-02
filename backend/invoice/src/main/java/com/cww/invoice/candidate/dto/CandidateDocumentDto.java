package com.cww.invoice.candidate.dto;

import com.cww.invoice.candidate.entity.enums.*;
import lombok.*;

import java.util.UUID;

@Data
public class CandidateDocumentDto {
    private UUID id;
    private DocumentType documentType;
    private String documentUrl;
    private VerificationStatus verificationStatus;
    private String remarks;
}
