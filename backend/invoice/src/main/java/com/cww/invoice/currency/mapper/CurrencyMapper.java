package com.cww.invoice.currency.mapper;

import com.cww.invoice.currency.dto.CurrencyResponseDTO;
import com.cww.invoice.currency.entity.Currency;

import java.util.List;

public class CurrencyMapper {

    public static CurrencyResponseDTO mapToDto(Currency currency) {
        CurrencyResponseDTO dto = new CurrencyResponseDTO();
        dto.setId(currency.getId());
        dto.setCode(currency.getCode());
        dto.setName(currency.getName());
        dto.setSymbol(currency.getSymbol());
        dto.setDecimalPlaces(currency.getDecimalPlaces());
        dto.setExchangeRate(currency.getExchangeRate());
        dto.setIsBaseCurrency(currency.getIsBaseCurrency());
        dto.setIsActive(currency.getIsActive());

        return dto;
    }
}
