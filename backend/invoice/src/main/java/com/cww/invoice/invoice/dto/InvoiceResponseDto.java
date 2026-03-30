package com.cww.invoice.invoice.dto;

import com.cww.invoice.invoice.entity.InvoiceStatus;
import lombok.Builder;
import lombok.Data;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class InvoiceResponseDto {

    private UUID id;
    private String clientName;
    private String invoiceNumber;
    private String poNumber;


    private LocalDate invoiceDate;

    private BigDecimal subTotal;
    private BigDecimal cgstAmount;
    private BigDecimal sgstAmount;
    private BigDecimal totalAmount;

    private InvoiceStatus status;
    private String pdfPath;
}
