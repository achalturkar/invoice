package com.cww.invoice.leave.repository;

import com.cww.invoice.leave.entity.LeavePolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LeavePolicyRepository extends JpaRepository<LeavePolicy, UUID> {

    List<LeavePolicy> findByCompanyId(UUID companyId);

    Optional<LeavePolicy> findByIdAndCompanyId(UUID id, UUID companyId);

    boolean existsByCompanyIdAndLeaveTypeIdAndPolicyYear(
            UUID companyId,
            UUID leaveTypeId,
            Integer policyYear
    );
}
