package com.cww.invoice.leave.repository;

import com.cww.invoice.leave.entity.EmployeeBalance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface EmployeeBalanceRepository extends JpaRepository<EmployeeBalance, UUID> {


    List<EmployeeBalance> findByEmployee_Id(UUID employeeId);

    Optional<EmployeeBalance> findByEmployee_IdAndLeaveType_IdAndPolicyYear(
            UUID employeeId,
            UUID leaveTypeId,
            Integer policyYear
    );
}

