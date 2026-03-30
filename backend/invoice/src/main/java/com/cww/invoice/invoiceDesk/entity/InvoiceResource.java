package com.cww.invoice.invoiceDesk.entity;

import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.common.entity.BaseEntity;
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
@Table(name = "invoice_resource")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResource extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @ManyToOne(fetch = FetchType.LAZY)
    private InvoiceDesk invoiceDesk;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private String resourceName;

    private Integer sac;

    private LocalDate periodFrom;
    private LocalDate periodTo;

    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineAmount;

    @OneToMany(
            mappedBy = "resource",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<InvoiceResourceTax> taxes = new ArrayList<>();



    public void addTax(InvoiceResourceTax tax) {
        tax.setResource(this);
        taxes.add(tax);
    }

}
