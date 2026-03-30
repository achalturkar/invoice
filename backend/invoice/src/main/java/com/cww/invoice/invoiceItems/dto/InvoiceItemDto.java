package com.cww.invoice.invoiceItems.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceItemDto {
    private String description;

    private BigDecimal quantity;
    private BigDecimal unitPrice;
}

