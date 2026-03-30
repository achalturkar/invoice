package com.cww.invoice.invoiceItems.entity;

import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.invoice.entity.Invoice;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "invoice_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /* ================= RELATIONS ================= */

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    /* ================= PAYROLL INFO ================= */

    @Column(nullable = false)
    private String resourceName;

    private Integer hsn;

    private LocalDate periodFrom;
    private LocalDate periodTo;

    @Column(nullable = false)
    private Integer workingHours;

    /* ================= PRICING ================= */

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal ratePerHour;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal amount; // hours × rate

    /* ================= GST ================= */

    @Column(precision = 5, scale = 2)
    private BigDecimal gstPercent; // 18%

    @Column(precision = 14, scale = 2)
    private BigDecimal cgstAmount;

    @Column(precision = 14, scale = 2)
    private BigDecimal sgstAmount;

    @Column(precision = 14, scale = 2)
    private BigDecimal taxAmount;

    @Column(precision = 14, scale = 2)
    private BigDecimal totalAmount;

    /* ================= AUTO CALC ================= */

    @PrePersist
    @PreUpdate
    public void calculate() {

        if (ratePerHour == null || workingHours == null) {
            return;
        }

        // Amount = hours × rate
        this.amount = ratePerHour.multiply(
                BigDecimal.valueOf(workingHours)
        );

        if (gstPercent != null) {
            BigDecimal gst = amount
                    .multiply(gstPercent)
                    .divide(BigDecimal.valueOf(100));

            this.cgstAmount = gst.divide(BigDecimal.valueOf(2));
            this.sgstAmount = gst.divide(BigDecimal.valueOf(2));
        } else {
            this.cgstAmount = BigDecimal.ZERO;
            this.sgstAmount = BigDecimal.ZERO;
        }

        this.totalAmount = amount
                .add(cgstAmount)
                .add(sgstAmount);
    }
}

