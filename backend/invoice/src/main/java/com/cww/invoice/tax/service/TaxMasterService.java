package com.cww.invoice.tax.service;

import com.cww.invoice.tax.entity.TaxMaster;
import com.cww.invoice.tax.repository.TaxMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaxMasterService {

    private final TaxMasterRepository taxRepo;

    // CREATE
    public TaxMaster create(TaxMaster tax) {
        if (taxRepo.existsByTaxCode(tax.getTaxCode())) {
            throw new RuntimeException("Tax code already exists");
        }
        tax.setActive(true);
        return taxRepo.save(tax);
    }

    // GET BY ID
    public TaxMaster getById(UUID id) {
        return taxRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tax not found"));
    }

    // GET BY CODE (SAFE)
    public TaxMaster getByTaxCode(String taxCode) {
        return taxRepo.findByTaxCodeAndActiveTrue(taxCode)
                .orElseThrow(() -> new RuntimeException("Active tax not found"));
    }

    // GET ALL ACTIVE
    public List<TaxMaster> getAllActive() {
        return taxRepo.findAllByActiveTrue();
    }

    // UPDATE
    public TaxMaster update(UUID id, TaxMaster updated) {
        TaxMaster existing = getById(id);
        existing.setTaxName(updated.getTaxName());
        existing.setTaxType(updated.getTaxType());
        existing.setActive(updated.getActive());
        return taxRepo.save(existing);
    }

    // SOFT DELETE
    public void deactivate(UUID id) {
        TaxMaster tax = getById(id);
        tax.setActive(false);
        taxRepo.save(tax);
    }
}

