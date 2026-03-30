package com.cww.invoice.invoiceDesk.entity;

import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.tax.entity.TaxMaster;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "invoice_tax")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceTax extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private InvoiceDesk invoiceDesk;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tax_id")
    private TaxMaster tax;

    private BigDecimal taxRate;
    private BigDecimal taxAmount;
}
