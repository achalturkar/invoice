package com.cww.invoice.bankDetails.controller;

import com.cww.invoice.bankDetails.dto.BankDetailsRequestDto;
import com.cww.invoice.bankDetails.dto.BankDetailsResponseDto;
import com.cww.invoice.bankDetails.service.BankDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/company/{companyId}/bank-details")
@RequiredArgsConstructor
public class BankDetailsController {

    private final BankDetailsService bankDetailsService;

    @GetMapping
    public BankDetailsResponseDto get(@PathVariable UUID companyId) {
        return bankDetailsService.getByCompany(companyId);
    }

    @PostMapping
    public BankDetailsResponseDto save(
            @PathVariable UUID companyId,
            @RequestBody BankDetailsRequestDto dto
    ) {
        return bankDetailsService.saveOrUpdate(companyId, dto);
    }
}

