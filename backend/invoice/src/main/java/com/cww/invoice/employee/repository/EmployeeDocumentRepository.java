package com.cww.invoice.employee.repository;

import com.cww.invoice.employee.entity.EmployeeDocument;
import com.cww.invoice.employee.entity.enums.DocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeDocumentRepository
        extends JpaRepository<EmployeeDocument, UUID> {

    List<EmployeeDocument> findByEmployeeId(UUID employeeId);

    Optional<EmployeeDocument>
    findByEmployeeIdAndDocumentType(UUID employeeId, DocumentType type);

}

