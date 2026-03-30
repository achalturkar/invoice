package com.cww.invoice.invoiceDesk.repository;

import com.cww.invoice.invoiceDesk.entity.InvoiceSequence;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface InvoiceSequenceRepository  extends JpaRepository<InvoiceSequence, UUID> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
        SELECT s FROM InvoiceSequence s
        WHERE s.company.id = :companyId
        AND s.financialYearStart = :fyStart
    """)
    Optional<InvoiceSequence> findForUpdateSequenceNumber(
            @Param("companyId") UUID companyId,
            @Param("fyStart") Integer fyStart
    );
}