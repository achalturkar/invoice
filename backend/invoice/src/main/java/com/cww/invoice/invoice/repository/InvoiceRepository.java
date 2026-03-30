package com.cww.invoice.invoice.repository;

import com.cww.invoice.invoice.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {

    List<Invoice> findByCompanyId(UUID companyId);

    long countByCompanyId(UUID companyId);

//    Page<Invoice> findAllInvoice(UUID companyId, Pageable pageable);

    Optional<Invoice> findByIdAndCompanyId(UUID id, UUID companyId);

    List<Invoice> findByCompanyIdOrderByCreatedAtDesc(UUID companyId);

    Page<Invoice> findByClient_Id(UUID clientId, Pageable pageable);

    @Query("""
       SELECT COALESCE(MAX(i.sequenceNumber), 0)
       FROM Invoice i
       WHERE i.company.id = :companyId
       AND EXTRACT(YEAR FROM i.invoiceDate) = :year
       """)
    Long findMaxSequence(UUID companyId, int year);

}
