package com.cww.invoice.candidate.entity;

import com.cww.invoice.candidate.entity.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "candidate_documents",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"candidate_id", "documentType"})
        }
)
@Getter
@Setter
public class CandidateDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    private String documentUrl;

    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus;

    private String remarks;
}
