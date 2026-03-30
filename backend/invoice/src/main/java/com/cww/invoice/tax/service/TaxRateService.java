package com.cww.invoice.tax.service;

import com.cww.invoice.tax.entity.TaxMaster;
import com.cww.invoice.tax.entity.TaxRate;
import com.cww.invoice.tax.repository.TaxRateRepository;
import com.cww.invoice.tax.repository.TaxMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaxRateService {

    private final TaxRateRepository taxRateRepo;
    private final TaxMasterRepository taxRepo;

    // CREATE RATE
    public TaxRate create(UUID taxId, TaxRate rate) {

        TaxMaster tax = taxRepo.findById(taxId)
                .orElseThrow(() -> new RuntimeException("Tax not found"));

        if (taxRateRepo.existsByTaxAndRatePercentageAndEffectiveFrom(
                tax,
                rate.getRatePercentage(),
                rate.getEffectiveFrom())) {
            throw new RuntimeException("Same tax rate already exists for this date");
        }

        rate.setTax(tax);
        return taxRateRepo.save(rate);
    }

    // GET BY ID
    public TaxRate getById(UUID id) {
        return taxRateRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tax rate not found"));
    }

    // GET CURRENT APPLICABLE RATE
    public TaxRate getCurrentRate(UUID taxId) {

        TaxMaster tax = taxRepo.findById(taxId)
                .orElseThrow(() -> new RuntimeException("Tax not found"));

        return taxRateRepo
                .findTopByTaxAndEffectiveFromLessThanEqualOrderByEffectiveFromDesc(
                        tax,
                        LocalDate.now()
                )
                .orElseThrow(() -> new RuntimeException("No active tax rate found"));
    }

    // GET RATE AS OF DATE (for old invoices)
    public TaxRate getRateAsOf(UUID taxId, LocalDate date) {

        TaxMaster tax = taxRepo.findById(taxId)
                .orElseThrow(() -> new RuntimeException("Tax not found"));

        return taxRateRepo
                .findTopByTaxAndEffectiveFromLessThanEqualOrderByEffectiveFromDesc(
                        tax,
                        date
                )
                .orElseThrow(() -> new RuntimeException("No tax rate for given date"));
    }

    // GET ALL RATES FOR TAX
    public List<TaxRate> getAllForTax(UUID taxId) {

        TaxMaster tax = taxRepo.findById(taxId)
                .orElseThrow(() -> new RuntimeException("Tax not found"));

        return taxRateRepo.findByTaxOrderByEffectiveFromDesc(tax);
    }
}
