package com.cww.invoice.candidate.entity;

import com.cww.invoice.candidate.entity.enums.*;
import com.cww.invoice.candidateproject.entity.CandidateProject;
import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "candidates")
@Getter
@Setter
public class Candidate extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String fullName;
    private String email;
    private String phone;

    private String skills;
    private Integer experienceYears;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    @Enumerated(EnumType.STRING)
    private CandidateStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @OneToMany(
            mappedBy = "candidate",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CandidateProject> projects = new ArrayList<>();

}
