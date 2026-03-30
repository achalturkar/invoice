package com.cww.invoice.company.repository;

import com.cww.invoice.company.entity.CompanyAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CompanyAddressRepository extends JpaRepository<CompanyAddress, UUID> {

    List<CompanyAddress> findByCompanyId(UUID companyId);

    List<CompanyAddress> findByCompanyIdAndIsPrimaryTrue(UUID companyId);

    Optional<CompanyAddress> findByIdAndCompanyId(
            UUID addressId,
            UUID companyId
    );
}
