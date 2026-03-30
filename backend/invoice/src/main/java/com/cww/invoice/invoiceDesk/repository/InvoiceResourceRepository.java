package com.cww.invoice.invoiceDesk.repository;

import com.cww.invoice.invoiceDesk.entity.InvoiceResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InvoiceResourceRepository extends JpaRepository<InvoiceResource, UUID> {
    List<InvoiceResource> findByInvoiceDesk_Id(UUID invoiceId);

}
