package com.cww.invoice.tax.entity;

import com.cww.invoice.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
@Entity
@Table(
        name = "tax_rate",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"tax_id", "rate_percentage", "effective_from"}
                )
        }
)
@Getter
@Setter
public class TaxRate extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tax_id", nullable = false)
    private TaxMaster tax;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal ratePercentage; // 0.00, 5.00, 12.00, 18.00, 28.00

    @Column(nullable = false)
    private LocalDate effectiveFrom;
}
