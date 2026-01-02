package com.cww.invoice.candidate.repository;

import com.cww.invoice.candidate.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CandidateRepository extends JpaRepository<Candidate, UUID> {

    List<Candidate> findByCompanyId(UUID companyId);

    Optional<Candidate> findByIdAndCompanyId(UUID id, UUID companyId);

}

