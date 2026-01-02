package com.cww.invoice.bankDetails.service;

import com.cww.invoice.bankDetails.Repository.BankDetailRepository;
import com.cww.invoice.bankDetails.dto.BankDetailsRequestDto;
import com.cww.invoice.bankDetails.dto.BankDetailsResponseDto;
import com.cww.invoice.bankDetails.entity.BankDetails;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BankDetailsService {

    private final BankDetailRepository bankDetailsRepository;
    private final CompanyRepository companyRepository;

    public BankDetailsResponseDto getByCompany(UUID companyId) {
        BankDetails bank = bankDetailsRepository.findByCompanyId(companyId)
                .orElseThrow(() -> new RuntimeException("Bank details not found"));

        return mapToDto(bank);
    }

    public BankDetailsResponseDto saveOrUpdate(
            UUID companyId,
            BankDetailsRequestDto dto
    ) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        BankDetails bank = bankDetailsRepository
                .findByCompanyId(companyId)
                .orElse(new BankDetails());

        bank.setCompany(company);
        bank.setBankName(dto.getBankName());
        bank.setBankBranch(dto.getBankBranch());
        bank.setBankAccountNo(dto.getBankAccountNo());
        bank.setBankIfsc(dto.getBankIfsc());
        bank.setBankAccountName(dto.getBankAccountName());
        bank.setSwiftCode(dto.getSwiftCode());
        bank.setPanNo(dto.getPanNo());
        bank.setTanNo(dto.getTanNo());
        bank.setUdyamRegNo(dto.getUdyamRegNo());

        bankDetailsRepository.save(bank);
        return mapToDto(bank);
    }

    private BankDetailsResponseDto mapToDto(BankDetails bank) {
        BankDetailsResponseDto dto = new BankDetailsResponseDto();
        dto.setId(bank.getId());
        dto.setBankName(bank.getBankName());
        dto.setBankBranch(bank.getBankBranch());
        dto.setBankAccountNo(bank.getBankAccountNo());
        dto.setBankIfsc(bank.getBankIfsc());
        dto.setBankAccountName(bank.getBankAccountName());
        dto.setSwiftCode(bank.getSwiftCode());
        dto.setPanNo(bank.getPanNo());
        dto.setTanNo(bank.getTanNo());
        dto.setUdyamRegNo(bank.getUdyamRegNo());
        return dto;
    }
}
