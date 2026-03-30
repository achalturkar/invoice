package com.cww.invoice.bankAccount.mapper;

import com.cww.invoice.bankAccount.dto.BankDetailsResponseDto;
import com.cww.invoice.bankAccount.entity.BankAccount;


public class BankMapper {


    public static BankDetailsResponseDto mapToDto(BankAccount bank) {
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
        dto.setStatus(bank.getStatus());
        dto.setIsDefault(bank.getIsDefault());
        return dto;
    }}
