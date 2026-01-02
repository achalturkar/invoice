package com.cww.invoice.invoiceItems.entity;

import com.cww.invoice.invoice.entity.Invoice;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "invoice_items")
@Getter
@Setter
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    private String description;

    private BigDecimal rate;
    private BigDecimal quantity;
    private BigDecimal amount;
}
