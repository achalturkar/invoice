package com.cww.invoice.invoiceDesk.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "invoice_resource_taxes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResourceTax {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resource_id")
    private InvoiceResource resource;

    private String taxCode;          // CGST / SGST / IGST
    private BigDecimal taxRate;       // 9 / 18
    private BigDecimal taxAmount;     // calculated
}
