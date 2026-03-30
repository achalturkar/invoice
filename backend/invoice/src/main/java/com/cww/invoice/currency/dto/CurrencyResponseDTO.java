package com.cww.invoice.currency.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CurrencyResponseDTO {

    private UUID id;
    private String code;
    private String name;
    private String symbol;
    private Integer decimalPlaces;
    private BigDecimal exchangeRate;
    private Boolean isBaseCurrency;
    private Boolean isActive;
}
