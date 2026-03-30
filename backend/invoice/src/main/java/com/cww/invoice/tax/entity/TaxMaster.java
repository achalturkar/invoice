package com.cww.invoice.tax.entity;

import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.invoiceDesk.enums.TaxType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "tax_master")
@Getter
@Setter
public class TaxMaster extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String taxCode;// CGST, SGST, IGST, EXPORT

    private String taxName;

    @Enumerated(EnumType.STRING)
    private TaxType taxType; // GST, EXPORT, NONE

    private Boolean active;
}
