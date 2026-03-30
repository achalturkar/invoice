package com.cww.invoice.invoice.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


import com.cww.invoice.invoiceItems.dto.InvoiceItemRequestDto;
import lombok.Data;


@Data
public class InvoiceRequestDto {

    private UUID clientId;

    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private String poNumber;

    // GST %
    private boolean gstApplicable; // true
    private Double gstPercent; // 18.0

    private List<InvoiceItemRequestDto> items;
}


