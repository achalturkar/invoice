package com.cww.invoice.invoiceDesk.repository;

import com.cww.invoice.invoiceDesk.entity.InvoiceDesk;
import com.cww.invoice.invoiceDesk.enums.InvoiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvoiceDeskRepository extends JpaRepository<InvoiceDesk, UUID> {
    Optional<InvoiceDesk> findByInvoiceNumber(String invoiceNumber);
    List<InvoiceDesk> findByCompany_Id(UUID companyId);

    List<InvoiceDesk> findByCompanyIdAndStatus(UUID companyId, InvoiceStatus status);


    Optional<InvoiceDesk> findByCompany_IdAndId(UUID companyId, UUID id);


    @Query("""
       SELECT COALESCE(MAX(i.sequenceNumber), 0)
       FROM InvoiceDesk i
       WHERE i.company.id = :companyId
       AND EXTRACT(YEAR FROM i.invoiceDate) = :year
       """)
    Long findMaxSequence(UUID companyId, int year);
}
