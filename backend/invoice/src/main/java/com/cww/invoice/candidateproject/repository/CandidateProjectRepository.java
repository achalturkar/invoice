package com.cww.invoice.candidateproject.repository;

import com.cww.invoice.candidateproject.entity.CandidateProject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CandidateProjectRepository extends JpaRepository<CandidateProject, UUID> {

    List<CandidateProject> findByCandidateId(UUID candidateId);

    List<CandidateProject> findByProjectId(UUID projectId);

    Optional<CandidateProject> findByCandidateIdAndProjectId(
            UUID candidateId,
            UUID projectId
    );
}
