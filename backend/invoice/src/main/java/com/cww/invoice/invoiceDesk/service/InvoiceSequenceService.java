package com.cww.invoice.invoiceDesk.service;

import com.cww.invoice.company.entity.Company;
import com.cww.invoice.invoiceDesk.entity.InvoiceSequence;
import com.cww.invoice.invoiceDesk.repository.InvoiceSequenceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceSequenceService {

    private final InvoiceSequenceRepository invoiceSequenceRepository;

    @Transactional
    public Long getNextSequence(Company company, int fyStartYear) {

        InvoiceSequence sequence = invoiceSequenceRepository
                .findForUpdateSequenceNumber(company.getId(), fyStartYear)
                .orElseGet(() -> {
                    InvoiceSequence newSeq = new InvoiceSequence();
                    newSeq.setCompany(company);
                    newSeq.setFinancialYearStart(fyStartYear);
                    newSeq.setCurrentSequence(0L);
                    return invoiceSequenceRepository.save(newSeq);
                });

        Long next = sequence.getCurrentSequence() + 1;
        sequence.setCurrentSequence(next);

        return next;
    }
}
