package com.cww.invoice.invoice.dto;

import com.cww.invoice.invoice.entity.InvoiceStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class InvoiceListDto {

    private UUID id;
    private String invoiceNumber;
    private String invoiceDate;
    private String clientName;
    private BigDecimal totalAmount;
    private InvoiceStatus status;
    private String pdfPath;
}
