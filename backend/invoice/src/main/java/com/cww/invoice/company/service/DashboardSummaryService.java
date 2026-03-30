package com.cww.invoice.company.service;

import com.cww.invoice.employee.repository.EmployeeRepository;
import com.cww.invoice.client.repository.ClientRepository;
import com.cww.invoice.company.dto.DashboardSummaryDto;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.invoice.repository.InvoiceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class DashboardSummaryService {

    private final EmployeeRepository employeeRepository;
    private final ClientRepository clientRepository;
    private final InvoiceRepository invoiceRepository;
    private final CompanyRepository companyRepository;

    public DashboardSummaryDto getSummary(UUID companyId) {

        // Validate company exists (important for security)
        if (!companyRepository.existsById(companyId)) {
            throw new RuntimeException("Company not found");
        }

        long totalCandidates = employeeRepository.countByCompanyId(companyId);
        long totalClients = clientRepository.countByCompanyId(companyId);
        long totalInvoice = invoiceRepository.countByCompanyId(companyId);

        return new DashboardSummaryDto(
                totalCandidates,
                totalClients,
                totalInvoice
        );
    }
}

