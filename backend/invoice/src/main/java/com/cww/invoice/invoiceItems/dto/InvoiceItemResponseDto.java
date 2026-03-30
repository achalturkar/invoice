package com.cww.invoice.invoiceItems.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class InvoiceItemResponseDto {

    private String employeeName;

    private Integer workingHours;
    private BigDecimal ratePerHour;
    private BigDecimal amount;

    private Integer hsn;


    private LocalDate periodFrom;
    private LocalDate periodTo;
}

