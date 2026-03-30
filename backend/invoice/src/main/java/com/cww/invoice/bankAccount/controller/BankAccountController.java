package com.cww.invoice.bankAccount.controller;

import com.cww.invoice.bankAccount.dto.BankDetailsRequestDto;
import com.cww.invoice.bankAccount.dto.BankDetailsResponseDto;
import com.cww.invoice.bankAccount.entity.BankAccountStatus;
import com.cww.invoice.bankAccount.service.BankAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/companies/{companyId}/bank-accounts")
public class BankAccountController {

    private final BankAccountService bankAccountService;

    // CREATE
    @PostMapping
    public BankDetailsResponseDto create(
            @PathVariable UUID companyId,
            @RequestBody BankDetailsRequestDto dto) {
        return bankAccountService.create(companyId, dto);
    }

    // LIST ALL
    @GetMapping
    public List<BankDetailsResponseDto> getAll(@PathVariable UUID companyId) {
        return bankAccountService.getAll(companyId);
    }

    // LIST ACTIVE (DROPDOWN)
    @GetMapping("/active")
    public List<BankDetailsResponseDto> getActive(@PathVariable UUID companyId) {
        return bankAccountService.getActive(companyId);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public BankDetailsResponseDto getById(@PathVariable UUID id) {
        return bankAccountService.getById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public BankDetailsResponseDto update(
            @PathVariable UUID id,
            @RequestBody BankDetailsRequestDto dto) {
        return bankAccountService.update(id, dto);
    }

    // STATUS CHANGE
    @PatchMapping("/{id}/status")
    public void updateStatus(
            @PathVariable UUID id,
            @RequestParam BankAccountStatus status) {
        bankAccountService.updateStatus(id, status);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        bankAccountService.delete(id);
    }
}


