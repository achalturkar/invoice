package com.cww.invoice.project.repository;

import com.cww.invoice.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByCompanyId(UUID companyId);

    Optional<Project> findByIdAndCompanyId(UUID id, UUID companyId);
}
