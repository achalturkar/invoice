package com.cww.invoice.invoiceItems.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class InvoiceItemRequestDto {

    private UUID employeeId;

    private LocalDate periodFrom;
    private LocalDate periodTo;

    private Integer hsn;

    private Integer workingHours;
    private BigDecimal ratePerHour;
}

