package com.cww.invoice.invoiceDesk.repository;

import com.cww.invoice.invoiceDesk.entity.InvoiceExportDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface InvoiceExportDetailsRepository extends JpaRepository<InvoiceExportDetails, UUID> {
    Optional<InvoiceExportDetails> findByInvoiceDesk_Id(UUID invoiceId);
}
