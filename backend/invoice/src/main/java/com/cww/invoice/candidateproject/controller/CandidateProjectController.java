package com.cww.invoice.candidateproject.controller;

import com.cww.invoice.candidate.entity.Candidate;
import com.cww.invoice.candidate.repository.CandidateRepository;
import com.cww.invoice.candidateproject.dto.CandidateProjectRequestDto;
import com.cww.invoice.candidateproject.entity.CandidateProject;
import com.cww.invoice.candidateproject.entity.enums.AssignmentStatus;
import com.cww.invoice.candidateproject.repository.CandidateProjectRepository;
import com.cww.invoice.project.entity.Project;
import com.cww.invoice.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/company/{companyId}/project-assignments")
@RequiredArgsConstructor
public class CandidateProjectController {

    private final CandidateRepository candidateRepo;
    private final ProjectRepository projectRepo;
    private final CandidateProjectRepository assignmentRepo;

    /* ================= ASSIGN ================= */

    @PostMapping
    public void assign(
            @PathVariable UUID companyId,
            @RequestBody CandidateProjectRequestDto dto
    ) {
        Candidate candidate = candidateRepo
                .findByIdAndCompanyId(dto.getCandidateId(), companyId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Project project = projectRepo
                .findByIdAndCompanyId(dto.getProjectId(), companyId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        assignmentRepo.findByCandidateIdAndProjectId(
                candidate.getId(), project.getId()
        ).ifPresent(a -> {
            throw new RuntimeException("Already assigned");
        });

        CandidateProject cp = new CandidateProject();
        cp.setCandidate(candidate);
        cp.setProject(project);
        cp.setStartDate(dto.getStartDate());
        cp.setBillingRate(dto.getBillingRate());
        cp.setAllocationPercent(dto.getAllocationPercent());
        cp.setStatus(AssignmentStatus.ACTIVE);

        assignmentRepo.save(cp);
    }
}

