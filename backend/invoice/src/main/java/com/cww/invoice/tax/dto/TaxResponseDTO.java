package com.cww.invoice.tax.dto;


import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class TaxResponseDTO {

    private String taxCode;
    private BigDecimal rate;
    private BigDecimal amount;
}

