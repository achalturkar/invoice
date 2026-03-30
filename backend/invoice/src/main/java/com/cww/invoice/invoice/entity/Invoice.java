package com.cww.invoice.invoice.entity;

import com.cww.invoice.client.entity.Client;
import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.invoiceItems.entity.InvoiceItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "invoices")
@Getter
@Setter
public class Invoice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /* ================= BASIC ================= */

    @Column(nullable = false, unique = true)
    private String invoiceNumber;

//    @Column(nullable = false)
    private Long sequenceNumber;


    private LocalDate invoiceDate;
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    /* ================= AMOUNTS ================= */

    @Column(precision = 15, scale = 2)
    private BigDecimal subTotal;

    @Column(precision = 15, scale = 2)
    private BigDecimal cgstAmount;

    @Column(precision = 15, scale = 2)
    private BigDecimal sgstAmount;

    @Column(precision = 15, scale = 2)
    private BigDecimal taxAmount;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalAmount;

    /* ================= GST FLAGS ================= */

    private boolean gstApplicable;

    private boolean reverseCharge = false; // Y / N

    private String poNumber;

    /* ================= PDF ================= */

    private String pdfPath;

    /* ================= RELATIONS ================= */

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(
            mappedBy = "invoice",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<InvoiceItem> items = new ArrayList<>();
}

