package com.cww.invoice.currency.controller;

import com.cww.invoice.currency.dto.CurrencyCreateRequestDTO;
import com.cww.invoice.currency.dto.CurrencyDropdownDTO;
import com.cww.invoice.currency.dto.CurrencyResponseDTO;
import com.cww.invoice.currency.entity.Currency;
import com.cww.invoice.currency.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies/currencies")
@RequiredArgsConstructor
public class CurrencyController {

    private final CurrencyService service;


    @PreAuthorize("SUPER_ADMIN")
    @PostMapping
    public CurrencyResponseDTO create(
            @RequestBody CurrencyCreateRequestDTO dto
    ) {
        return service.createCurrency(dto);
    }


    // Invoice / Public
    @GetMapping("/active")
    public List<CurrencyDropdownDTO> getActiveCurrencies() {
        return service.getAllActive()
                .stream()
                .map(c -> new CurrencyDropdownDTO(
                        c.getId(),
                        c.getCode(),
                        c.getName(),
                        c.getSymbol()
                ))
                .toList();
    }

    // Invoice internal
    @GetMapping("/{code}")
    public CurrencyResponseDTO getCurrency(@PathVariable String code) {
        Currency c = service.getActiveByCode(code);
        return new CurrencyResponseDTO(
                c.getId(),
                c.getCode(),
                c.getName(),
                c.getSymbol(),
                c.getDecimalPlaces(),
                c.getExchangeRate(),
                c.getIsBaseCurrency(),
                c.getIsActive()
        );
    }
}
