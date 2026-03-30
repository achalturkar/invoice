package com.cww.invoice.tax.controller;

import com.cww.invoice.tax.entity.TaxMaster;
import com.cww.invoice.tax.service.TaxMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/taxes")
@RequiredArgsConstructor
public class TaxMasterController {

    private final TaxMasterService taxService;

    @PostMapping
    public TaxMaster create(@RequestBody TaxMaster tax) {
        return taxService.create(tax);
    }

    @GetMapping("/{id}")
    public TaxMaster getById(@PathVariable UUID id) {
        return taxService.getById(id);
    }

    @GetMapping("/code/{code}")
    public TaxMaster getByCode(@PathVariable String code) {
        return taxService.getByTaxCode(code);
    }

    @GetMapping
    public List<TaxMaster> getAllActive() {
        return taxService.getAllActive();
    }

    @PutMapping("/{id}")
    public TaxMaster update(@PathVariable UUID id,
                            @RequestBody TaxMaster tax) {
        return taxService.update(id, tax);
    }

    @DeleteMapping("/{id}")
    public void deactivate(@PathVariable UUID id) {
        taxService.deactivate(id);
    }
}

