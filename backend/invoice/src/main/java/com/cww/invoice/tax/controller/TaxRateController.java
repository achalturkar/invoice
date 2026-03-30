package com.cww.invoice.tax.controller;

import com.cww.invoice.tax.entity.TaxRate;
import com.cww.invoice.tax.service.TaxRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tax-rates")
@RequiredArgsConstructor
public class TaxRateController {

    private final TaxRateService taxRateService;

    // CREATE RATE
    @PostMapping("/{taxId}")
    public TaxRate create(@PathVariable UUID taxId,
                          @RequestBody TaxRate rate) {
        return taxRateService.create(taxId, rate);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public TaxRate getById(@PathVariable UUID id) {
        return taxRateService.getById(id);
    }

    // GET CURRENT RATE
    @GetMapping("/current/{taxId}")
    public TaxRate getCurrent(@PathVariable UUID taxId) {
        return taxRateService.getCurrentRate(taxId);
    }

    // GET RATE AS OF DATE
    @GetMapping("/as-of/{taxId}")
    public TaxRate getAsOf(@PathVariable UUID taxId,
                           @RequestParam LocalDate date) {
        return taxRateService.getRateAsOf(taxId, date);
    }

    // GET ALL RATES FOR TAX
    @GetMapping("/tax/{taxId}")
    public List<TaxRate> getAllForTax(@PathVariable UUID taxId) {
        return taxRateService.getAllForTax(taxId);
    }
}
