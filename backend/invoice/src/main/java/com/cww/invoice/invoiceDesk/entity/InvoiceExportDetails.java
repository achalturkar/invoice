package com.cww.invoice.invoiceDesk.entity;

import com.cww.invoice.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "invoice_export_details")
@Getter
@Setter
public class InvoiceExportDetails extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id")
    private InvoiceDesk invoiceDesk;


    private String lutNo;
    private String exportRemark;
}
