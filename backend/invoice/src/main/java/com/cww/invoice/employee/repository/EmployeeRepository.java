package com.cww.invoice.employee.repository;

import com.cww.invoice.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    List<Employee> findByCompanyId(UUID companyId);

    long countByCompanyId(UUID companyId);

    Optional<Employee> findByIdAndCompanyId(UUID id, UUID companyId);

    Optional<Employee> findByUser_IdAndCompanyId(UUID userId, UUID companyId);

    Optional<Employee> findByUser_Id(UUID userId);

}

