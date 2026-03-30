package com.cww.invoice.invoiceDesk.dto;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class LineTaxDTO {

    private String taxCode;
    private BigDecimal taxRate;
    private BigDecimal taxAmount;
}
