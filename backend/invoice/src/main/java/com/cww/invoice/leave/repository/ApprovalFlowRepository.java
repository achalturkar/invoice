package com.cww.invoice.leave.repository;

import com.cww.invoice.leave.dto.ApprovalFlow.ApprovalFlowResponseDTO;
import com.cww.invoice.leave.entity.ApprovalFlow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ApprovalFlowRepository
        extends JpaRepository<ApprovalFlow, UUID> {

    Optional<ApprovalFlow> findByCompany_IdAndModuleAndActiveTrue(
            UUID companyId,
            String module
    );

    List<ApprovalFlow> findByCompany_Id(UUID companyId);

    Optional<ApprovalFlow> findByModuleAndActiveTrue(String module);

    boolean existsByCompany_IdAndModuleAndActiveTrue(
            UUID companyId,
            String module
    );

}

