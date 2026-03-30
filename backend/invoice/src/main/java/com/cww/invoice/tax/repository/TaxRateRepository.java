package com.cww.invoice.tax.repository;

import com.cww.invoice.tax.entity.TaxMaster;
import com.cww.invoice.tax.entity.TaxRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaxRateRepository extends JpaRepository<TaxRate, UUID> {
    List<TaxRate> findByTax_Id(UUID taxId);

    Optional<TaxRate> findTopByTax_IdOrderByEffectiveFromDesc(UUID taxMasterId);

    List<TaxRate> findByTaxOrderByEffectiveFromDesc(TaxMaster tax);

    Optional<TaxRate> findTopByTaxAndEffectiveFromLessThanEqualOrderByEffectiveFromDesc(
            TaxMaster tax,
            LocalDate date
    );

    boolean existsByTaxAndRatePercentageAndEffectiveFrom(
            TaxMaster tax,
            BigDecimal ratePercentage,
            LocalDate effectiveFrom
    );
}
