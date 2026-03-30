package com.cww.invoice.bankAccount.service;

import com.cww.invoice.bankAccount.Repository.BankAccountRepository;
import com.cww.invoice.bankAccount.dto.BankDetailsRequestDto;
import com.cww.invoice.bankAccount.dto.BankDetailsResponseDto;
import com.cww.invoice.bankAccount.entity.BankAccount;
import com.cww.invoice.bankAccount.entity.BankAccountStatus;
import com.cww.invoice.bankAccount.mapper.BankMapper;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.cww.invoice.bankAccount.mapper.BankMapper.mapToDto;


@Service
@RequiredArgsConstructor
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final CompanyRepository companyRepository;

    // CREATE
    public BankDetailsResponseDto create(UUID companyId, BankDetailsRequestDto dto) {
        Company company = getCompany(companyId);

        BankAccount bank = new BankAccount();
        mapRequestToEntity(dto, bank);
        bank.setCompany(company);

        return mapToDto(bankAccountRepository.save(bank));
    }

    // LIST ALL
    public List<BankDetailsResponseDto> getAll(UUID companyId) {
        return bankAccountRepository.findAllByCompanyId(companyId)
                .stream()
                .map(BankMapper::mapToDto)
                .toList();
    }

    // LIST ACTIVE (DROPDOWN)
    public List<BankDetailsResponseDto> getActive(UUID companyId) {
        return bankAccountRepository
                .findAllByCompanyIdAndStatus(companyId, BankAccountStatus.ACTIVE)
                .stream()
                .map(BankMapper::mapToDto)
                .toList();
    }

    // GET BY ID
    public BankDetailsResponseDto getById(UUID id) {
        return mapToDto(getBank(id));
    }

    // UPDATE
    public BankDetailsResponseDto update(UUID id, BankDetailsRequestDto dto) {
        BankAccount bank = getBank(id);
        mapRequestToEntity(dto, bank);
        return mapToDto(bankAccountRepository.save(bank));
    }

    // STATUS CHANGE
    public void updateStatus(UUID id, BankAccountStatus status) {
        BankAccount bank = getBank(id);
        bank.setStatus(status);
        bankAccountRepository.save(bank);
    }

    // DELETE
    public void delete(UUID id) {
        bankAccountRepository.delete(getBank(id));
    }

    // ================== HELPERS ==================

    private Company getCompany(UUID id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    private BankAccount getBank(UUID id) {
        return bankAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bank account not found"));
    }

    private void mapRequestToEntity(BankDetailsRequestDto dto, BankAccount bank) {
        bank.setBankName(dto.getBankName());
        bank.setBankBranch(dto.getBankBranch());
        bank.setBankAccountNo(dto.getBankAccountNo());
        bank.setBankIfsc(dto.getBankIfsc());
        bank.setBankAccountName(dto.getBankAccountName());
        bank.setSwiftCode(dto.getSwiftCode());
        bank.setPanNo(dto.getPanNo());
        bank.setTanNo(dto.getTanNo());
        bank.setUdyamRegNo(dto.getUdyamRegNo());
    }

}
