package com.cww.invoice.employee.entity;

import com.cww.invoice.employee.entity.enums.*;
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
public class EmployeeDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Employee employee;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    private String documentUrl;

    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus;

    private String remarks;
}
