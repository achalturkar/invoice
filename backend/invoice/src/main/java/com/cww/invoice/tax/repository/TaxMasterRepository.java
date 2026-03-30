package com.cww.invoice.tax.repository;


import com.cww.invoice.tax.entity.TaxMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaxMasterRepository extends JpaRepository<TaxMaster, UUID> {
    Optional<TaxMaster> findByTaxCode(String taxCode);

    Optional<TaxMaster> findByTaxCodeAndActiveTrue(String taxCode);

    List<TaxMaster> findAllByActiveTrue();

    boolean existsByTaxCode(String taxCode);
}