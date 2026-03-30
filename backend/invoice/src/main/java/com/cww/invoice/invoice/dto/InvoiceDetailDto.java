package com.cww.invoice.invoice.dto;

import com.cww.invoice.invoice.entity.InvoiceStatus;
import com.cww.invoice.invoiceItems.dto.InvoiceItemResponseDto;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class InvoiceDetailDto {

    private UUID id;
    private String invoiceNumber;
    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private String poNumber;


    private String clientName;

    private BigDecimal subTotal;
    private BigDecimal cgstAmount;
    private BigDecimal sgstAmount;
    private BigDecimal totalAmount;

    private InvoiceStatus status;
    private String pdfPath;

    private List<InvoiceItemResponseDto> items;
}

