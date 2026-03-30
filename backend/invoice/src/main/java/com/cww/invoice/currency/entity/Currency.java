package com.cww.invoice.currency.entity;

import com.cww.invoice.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(
        name = "currencies",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "code")
        }
)
@Getter
@Setter
public class Currency extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 3)
    private String code;        // INR, USD, EUR

    @Column(nullable = false)
    private String name;        // Indian Rupee

    private String symbol;      // ₹, $, €

    @Column(nullable = true)
    private Integer decimalPlaces = 2;

    /**
     * Base currency ke against rate
     * Example:
     * Base = INR
     * USD = 83.12
     */
    @Column(precision = 18, scale = 6)
    private BigDecimal exchangeRate;

    private Boolean isBaseCurrency = false; // INR = true

    private Boolean isActive = true;
}
