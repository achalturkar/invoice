package com.cww.invoice.currency.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CurrencyDropdownDTO {
    private UUID id;
    private String code;
    private String name;
    private String symbol;
}

