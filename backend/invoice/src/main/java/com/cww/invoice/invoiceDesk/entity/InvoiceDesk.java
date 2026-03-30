package com.cww.invoice.invoiceDesk.entity;


import com.cww.invoice.bankAccount.entity.BankAccount;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.currency.entity.Currency;
import com.cww.invoice.invoiceDesk.enums.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "invoice_desk")
public class InvoiceDesk extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    @Enumerated(EnumType.STRING)
    private InvoiceNature invoiceNature; // STANDARD, CREDIT, DEBIT

    @Enumerated(EnumType.STRING)
    private InvoiceSupplyType supplyType; // INTRA, INTER, INTERNATIONAL

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;       // DRAFT, FINAL, CANCELLED

    private String poNumber;

    private boolean reverseCharge = false; // Y / N

    private String description;

    private  Long sequenceNumber;

    /* ================= DATES ================= */

    private LocalDate invoiceDate;

    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private PaymentTerm paymentTerm; // IMMEDIATE, NET_15, NET_30

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_id")
    private Currency currency;

    /* ================= AMOUNTS ================= */

    @Column(precision = 15, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalTax = BigDecimal.ZERO;

    @Column(precision = 15, scale = 2)
    private BigDecimal grandTotal = BigDecimal.ZERO;

    /* ================= OPTIONAL ================= */

    private String notes;
    private String pdfPath;

    private Boolean printFlag;

    private Boolean prePrintedPaper;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id")
    private Client client;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "candidate_id")
//    private Candidate candidate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_account_id")
    private BankAccount bankAccount;

    @OneToOne(mappedBy = "invoiceDesk", cascade = CascadeType.ALL)
    private InvoiceExportDetails exportDetails;

    @OneToMany(mappedBy = "invoiceDesk", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoiceResource> resources = new ArrayList<>();

    @OneToMany(mappedBy = "invoiceDesk", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoiceTax> taxes = new ArrayList<>();

    public void addResource(InvoiceResource resource) {
        resources.add(resource);
        resource.setInvoiceDesk(this);
    }

    public void addTax(InvoiceTax tax) {
        taxes.add(tax);
        tax.setInvoiceDesk(this);
    }

}
