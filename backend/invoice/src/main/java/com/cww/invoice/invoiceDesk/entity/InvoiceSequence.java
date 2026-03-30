package com.cww.invoice.invoiceDesk.entity;


import com.cww.invoice.company.entity.Company;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "invoice_sequences",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_company_fy",
                        columnNames = {"company_id", "financial_year_start"}
                )
        }
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceSequence {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "financial_year_start", nullable = false)
    private Integer financialYearStart; // e.g. 2025 for FY 25-26

    @Column(name = "current_sequence", nullable = false)
    private Long currentSequence = 0L;
}

