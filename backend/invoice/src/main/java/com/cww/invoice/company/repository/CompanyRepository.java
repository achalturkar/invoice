package com.cww.invoice.company.repository;

import com.cww.invoice.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    boolean existsByEmail(String email);
    boolean existsByGstNo(String gstNo);

}

