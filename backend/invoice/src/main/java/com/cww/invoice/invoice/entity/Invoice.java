package com.cww.invoice.invoice.entity;

import com.cww.invoice.candidate.entity.Candidate;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.invoiceItems.entity.InvoiceItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = true)
    private Candidate candidate;

    private String invoiceNumber;
    private LocalDate invoiceDate;
    private LocalDate dueDate;

    private BigDecimal subtotal;
    private BigDecimal gstAmount;
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private List<InvoiceItem> items;
}

