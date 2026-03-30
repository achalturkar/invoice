package com.cww.invoice.invoiceDesk.repository;

import com.cww.invoice.invoiceDesk.entity.InvoiceTax;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InvoiceTaxRepository extends JpaRepository<InvoiceTax, UUID> {
    List<InvoiceTax> findByInvoiceDesk_Id(UUID invoiceId);
}
