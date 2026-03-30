package com.cww.invoice.leave.repository;

import com.cww.invoice.leave.entity.ApprovalFlowStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApprovalFlowStepRepository
        extends JpaRepository<ApprovalFlowStep, UUID> {

    List<ApprovalFlowStep> findByFlow_IdOrderByLevelNumber(UUID flowId);

    List<ApprovalFlowStep> findByFlow_Company_Id(UUID companyId);


    boolean existsByFlow_IdAndLevelNumber(UUID flowId, Integer levelNumber);

    void deleteByFlow_Id(UUID flowId);

}

