package com.cww.invoice.invoiceDesk.service.impl;

import com.cww.invoice.bankAccount.Repository.BankAccountRepository;
import com.cww.invoice.bankAccount.entity.BankAccount;
import com.cww.invoice.common.service.InvoiceDeskPdfService;
import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.employee.repository.EmployeeRepository;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.client.repository.ClientRepository;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.currency.entity.Currency;
import com.cww.invoice.currency.repository.CurrencyRepository;
import com.cww.invoice.invoice.dto.FileResponse;
import com.cww.invoice.invoiceDesk.dto.InvoiceDeskCreateRequestDTO;
import com.cww.invoice.invoiceDesk.dto.InvoiceDeskResponseDTO;
import com.cww.invoice.invoiceDesk.dto.InvoiceLineRequestDTO;
import com.cww.invoice.invoiceDesk.entity.*;
import com.cww.invoice.invoiceDesk.enums.InvoiceStatus;
import com.cww.invoice.invoiceDesk.enums.InvoiceSupplyType;
import com.cww.invoice.invoiceDesk.mapper.InvoiceDeskMapper;
import com.cww.invoice.invoiceDesk.repository.InvoiceDeskRepository;
import com.cww.invoice.invoiceDesk.service.InvoiceDeskService;
import com.cww.invoice.invoiceDesk.service.InvoiceSequenceService;
import com.cww.invoice.tax.entity.TaxMaster;
import com.cww.invoice.tax.entity.TaxRate;
import com.cww.invoice.tax.repository.TaxMasterRepository;
import com.cww.invoice.tax.repository.TaxRateRepository;
import com.cww.invoice.tax.service.GstCalculationService;
import com.cww.invoice.tax.service.GstDecisionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceDeskServiceImpl implements InvoiceDeskService {

    private final InvoiceDeskRepository invoiceDeskRepository;
    private final CompanyRepository companyRepository;
    private final ClientRepository clientRepository;
    private final CurrencyRepository currencyRepository;

    private final EmployeeRepository employeeRepository;

    private final GstDecisionService gstDecisionService;
    private final GstCalculationService gstCalculationService;

    private final TaxMasterRepository taxMasterRepository;
    private final TaxRateRepository taxRateRepository;

    private final BankAccountRepository bankAccountRepository;

    private final InvoiceDeskPdfService pdfService;
    private final StorageService storageService;
    private final InvoiceSequenceService sequenceService;



    /* =====================================================
       CREATE DRAFT INVOICE
    ===================================================== */

    @Override
    public InvoiceDeskResponseDTO createDraftInvoice(
            UUID companyId,
            InvoiceDeskCreateRequestDTO dto
    ) {

        InvoiceDesk invoice = InvoiceDeskMapper.toEntity(dto);
        invoice.setStatus(InvoiceStatus.DRAFT);

        attachMasters(invoice, companyId, dto);

        // Invoice Lines
        BigDecimal subtotal = BigDecimal.ZERO;

        for (InvoiceLineRequestDTO lineDTO : dto.getLines()) {

            Employee employee = null;

            if (lineDTO.getEmployeeId() != null) {
                employee = employeeRepository
                        .findByIdAndCompanyId(lineDTO.getEmployeeId(), companyId)
                        .orElseThrow(() -> new RuntimeException("Employee not found"));
            }

            InvoiceResource line =
                    InvoiceDeskMapper.toLineEntity(
                            lineDTO,
                            invoice,
                            employee
                    );

            // LINE AMOUNT
            BigDecimal lineAmount =
                    lineDTO.getUnitPrice().multiply(lineDTO.getQuantity());

            line.setLineAmount(lineAmount);

            //  DECIDE SUPPLY TYPE
            InvoiceSupplyType supplyType =
                    gstDecisionService.decideInvoiceType(invoice);

            //  APPLY GST PER LINE
            applyLineTax(line, supplyType);

            invoice.addResource(line);
            subtotal = subtotal.add(lineAmount);
        }


        invoice.setSubtotal(subtotal);

        //  GST Supply Type
        InvoiceSupplyType supplyType =
                gstDecisionService.decideInvoiceType(invoice);

        invoice.setSupplyType(supplyType);


        //  Export Details (optional)

        if (invoice.getSupplyType() == InvoiceSupplyType.INTERNATIONAL) {
            InvoiceExportDetails exportDetails = new InvoiceExportDetails();
            exportDetails.setInvoiceDesk(invoice);

            // LUT always comes from COMPANY
            exportDetails.setLutNo(invoice.getCompany().getLutNo());

            exportDetails.setExportRemark(
                    "This is the invoice raised for export under LUT acknowledgement number "
                            + invoice.getCompany().getLutNo()
                            + ". No GST has been charged as per Section 16 of IGST Act."
            );

            invoice.setExportDetails(exportDetails);

            invoice.setTotalTax(BigDecimal.ZERO);
            invoice.setGrandTotal(invoice.getSubtotal());
        }


        //  GST Calculation
        List<InvoiceTax> taxes =
                gstCalculationService.calculateTax(invoice);



        BigDecimal totalTax = BigDecimal.ZERO;
        for (InvoiceTax tax : taxes) {
            invoice.addTax(tax);
            totalTax = totalTax.add(tax.getTaxAmount());
        }

        if (invoice.getSupplyType() != InvoiceSupplyType.INTERNATIONAL) {
            invoice.setTotalTax(totalTax);
            invoice.setGrandTotal(subtotal.add(totalTax));
        }


        invoice.setTotalTax(totalTax);
        invoice.setGrandTotal(subtotal.add(totalTax));


        //  Draft Invoice Number
        invoice.setInvoiceNumber(generateDraftInvoiceNumber());

        // Save (cascade handles children)
        InvoiceDesk savedInvoice =
                invoiceDeskRepository.save(invoice);

        // Full Response (UI + PDF)
        return InvoiceDeskMapper.toDetailResponse(savedInvoice);
    }


    @Override
    @Transactional
    public InvoiceDeskResponseDTO updateDraftInvoice(
            UUID companyId,
            UUID invoiceId,
            InvoiceDeskCreateRequestDTO dto
    ) {

        InvoiceDesk invoice = invoiceDeskRepository
                .findByCompany_IdAndId(companyId, invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        //  Allow update only for DRAFT
        if (invoice.getStatus() != InvoiceStatus.DRAFT) {
            throw new RuntimeException("Only DRAFT invoice can be updated");
        }

    /* ============================================
        UPDATE BASIC FIELDS
    ============================================ */

        invoice.setInvoiceDate(dto.getInvoiceDate());
        invoice.setDueDate(dto.getDueDate());
        invoice.setInvoiceNature(dto.getInvoiceNature());
        invoice.setPaymentTerm(dto.getPaymentTerm());
        invoice.setPoNumber(dto.getPoNumber());
        invoice.setDescription(dto.getDescription());
        invoice.setReverseCharge(dto.getReverseCharge());

    /* ============================================
       UPDATE MASTER DATA
    ============================================ */

        attachMasters(invoice, companyId, dto);

    /* ============================================
        CLEAR OLD LINES + TAXES
    ============================================ */

        invoice.getResources().clear();
        invoice.getTaxes().clear();

        BigDecimal subtotal = BigDecimal.ZERO;

    /* ============================================
       REBUILD LINES
    ============================================ */

        for (InvoiceLineRequestDTO lineDTO : dto.getLines()) {

            Employee employee = null;

            if (lineDTO.getEmployeeId() != null) {
                employee = employeeRepository.findByIdAndCompanyId(lineDTO.getEmployeeId(), companyId)
                        .orElseThrow(() -> new RuntimeException("Employee not found"));
            }

            InvoiceResource line =
                    InvoiceDeskMapper.toLineEntity(
                            lineDTO,
                            invoice,
                            employee
                    );

            BigDecimal lineAmount =
                    line.getUnitPrice().multiply(line.getQuantity());

            line.setLineAmount(lineAmount);

            InvoiceSupplyType supplyType =
                    gstDecisionService.decideInvoiceType(invoice);

            applyLineTax(line, supplyType);

            invoice.addResource(line);

            subtotal = subtotal.add(lineAmount);
        }

        invoice.setSubtotal(subtotal);

    /* ============================================
        SUPPLY TYPE + GST
    ============================================ */

        InvoiceSupplyType supplyType =
                gstDecisionService.decideInvoiceType(invoice);

        invoice.setSupplyType(supplyType);

        if (supplyType == InvoiceSupplyType.INTERNATIONAL) {

            InvoiceExportDetails exportDetails = new InvoiceExportDetails();
            exportDetails.setInvoiceDesk(invoice);
            exportDetails.setLutNo(invoice.getCompany().getLutNo());
            exportDetails.setExportRemark(
                    "This is the invoice raised for export under LUT acknowledgement number "
                            + invoice.getCompany().getLutNo()
                            + ". No GST charged as per Section 16 of IGST Act."
            );

            invoice.setExportDetails(exportDetails);
            invoice.setTotalTax(BigDecimal.ZERO);
            invoice.setGrandTotal(subtotal);

        } else {

            List<InvoiceTax> taxes =
                    gstCalculationService.calculateTax(invoice);

            BigDecimal totalTax = BigDecimal.ZERO;

            for (InvoiceTax tax : taxes) {
                invoice.addTax(tax);
                totalTax = totalTax.add(tax.getTaxAmount());
            }

            invoice.setTotalTax(totalTax);
            invoice.setGrandTotal(subtotal.add(totalTax));
        }

    /* ============================================
        SAVE
    ============================================ */

        InvoiceDesk updated = invoiceDeskRepository.save(invoice);

        return InvoiceDeskMapper.toDetailResponse(updated);
    }




    /* =====================================================
       FINALIZE INVOICE
    ===================================================== */

    @Override
    @Transactional
    public InvoiceDeskResponseDTO finalizeInvoice(UUID invoiceId) {

        InvoiceDesk invoice = invoiceDeskRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        //  Prevent double finalization
        if (invoice.getStatus() == InvoiceStatus.FINAL) {
            throw new RuntimeException("Invoice already finalized");
        }

        Company company = invoice.getCompany();

        //  IMPORTANT: Use invoice date for FY calculation
        LocalDate invoiceDate = invoice.getInvoiceDate();
        String financialYear = getFinancialYear(invoiceDate);

        int fyStartYear = getFinancialYearStartYear(invoiceDate);

        Long nextSequence = sequenceService.getNextSequence(company, fyStartYear);

        invoice.setSequenceNumber(nextSequence);

        String invoiceNumber = "INV-"
                + company.getCompanyCode()
                + "/"
                + financialYear
                + "/"
                + nextSequence;

        invoice.setInvoiceNumber(invoiceNumber);
        invoice.setStatus(InvoiceStatus.FINAL);


        //  Generate PDF
        InvoiceDeskResponseDTO tempResponse =
                InvoiceDeskMapper.toDetailResponse(invoice);

        byte[] pdf = pdfService.generatePdf(tempResponse);

        String relativePath = "invoices/"
                + company.getCompanyCode()
                + "/"
                + invoiceNumber
                + ".pdf";

        String storedPath = storageService.uploadPdf(pdf, relativePath);

        invoice.setPdfPath(storedPath);

        InvoiceDesk saved = invoiceDeskRepository.save(invoice);

        return InvoiceDeskMapper.toDetailResponse(saved);
    }



    @Override
    @Transactional
    public InvoiceDeskResponseDTO getInvoice(UUID invoiceId) {

        InvoiceDesk invoice = invoiceDeskRepository.findById(invoiceId)
                .orElseThrow(() ->
                        new RuntimeException("Invoice not found with id: " + invoiceId));

        return InvoiceDeskMapper.toDetailResponse(invoice);
    }

    @Override
    public List<InvoiceDeskResponseDTO> getAllInvoice(UUID companyId) {
        return invoiceDeskRepository.findByCompany_Id(companyId)
                .stream()
                .map(InvoiceDeskMapper::toDetailResponse )
                .toList();
    }

    @Override
    @Transactional
    public List<InvoiceDeskResponseDTO> getInvoices(UUID companyId, InvoiceStatus status) {

        List<InvoiceDesk> invoices;

        if (status != null) {
            invoices = invoiceDeskRepository
                    .findByCompanyIdAndStatus(companyId, status);
        } else {
            invoices = invoiceDeskRepository
                    .findByCompany_Id(companyId);
        }

        return invoices.stream()
                .map(InvoiceDeskMapper::toDetailResponse)
                .toList();
    }

    @Override
    public void deleteInvoiceDeskById(UUID companyId,  UUID invoiceId) {

        InvoiceDesk  invoiceDesk = invoiceDeskRepository
                .findByCompany_IdAndId(companyId, invoiceId)
                .orElseThrow(()-> new RuntimeException("InvoiceDesk Not Found"));

        invoiceDeskRepository.delete(invoiceDesk);

    }

    @Override
    @Transactional
    public FileResponse getInvoiceFile(UUID companyId, UUID invoiceId) {
        InvoiceDesk invoiceDesk = invoiceDeskRepository
                .findByCompany_IdAndId(companyId, invoiceId)
                .orElseThrow(()-> new RuntimeException("Invoice Not found "));

        Path filePath = storageService.resolvePath(invoiceDesk.getPdfPath());

        if (!Files.exists(filePath)) {
            throw new RuntimeException("Invoice file missing");
        }

        try {
            Resource resource = new UrlResource(filePath.toUri());

            return new FileResponse(
                    resource,
                    "invoice-" + invoiceDesk.getInvoiceNumber() + ".pdf",
                    MediaType.APPLICATION_PDF
            );

        } catch (MalformedURLException e) {
            throw new RuntimeException("File error", e);
        }

    }


    /* =====================================================
       HELPERS
    ===================================================== */

    private void attachMasters(
            InvoiceDesk invoiceDesk,
            UUID companyId,
            InvoiceDeskCreateRequestDTO dto) {

        Company company = companyRepository
                .findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Client client = clientRepository
                .findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Currency currency = currencyRepository
                .findById(dto.getCurrencyId())
                .orElseThrow(() -> new RuntimeException("Currency not found"));

        BankAccount bankAccount = bankAccountRepository.findById(dto.getBankAccountId())
                        .orElseThrow(() -> new RuntimeException(("Bank Account Not Found")));

        invoiceDesk.setCompany(company);
        invoiceDesk.setClient(client);
        invoiceDesk.setCurrency(currency);
        invoiceDesk.setBankAccount(bankAccount);
    }


    private String generateDraftInvoiceNumber() {
        return "DRAFT-" + System.currentTimeMillis();
    }


    private String getFinancialYear(LocalDate date) {
        int year = date.getYear();
        int month = date.getMonthValue();

        if (month < 4) {
            return (year - 1) % 100 + "-" + year % 100;
        }
        return year % 100 + "-" + (year + 1) % 100;
    }

    private int getFinancialYearStartYear(LocalDate date) {
        int year = date.getYear();
        int month = date.getMonthValue();

        return (month < 4) ? year - 1 : year;
    }


    private void applyLineTax(
            InvoiceResource line,
            InvoiceSupplyType supplyType
    ) {

        switch (supplyType) {

            case INTRA -> {
                addTax(line, "CGST");
                addTax(line, "SGST");
            }

            case INTER -> {
                addTax(line, "IGST");
            }

            case INTERNATIONAL -> {
//                addZeroTax(line, "EXPORT");
            }
        }
    }


    private void addTax(InvoiceResource line, String taxCode) {

        TaxMaster taxMaster = taxMasterRepository
                .findByTaxCode(taxCode)
                .orElseThrow(() -> new RuntimeException("TaxMaster not found"));

        TaxRate taxRate = taxRateRepository
                .findTopByTax_IdOrderByEffectiveFromDesc(taxMaster.getId())
                .orElseThrow(() -> new RuntimeException("TaxRate not found"));

        BigDecimal taxAmount =
                line.getLineAmount()
                        .multiply(taxRate.getRatePercentage())
                        .divide(BigDecimal.valueOf(100));

        InvoiceResourceTax tax = new InvoiceResourceTax();
        tax.setTaxCode(taxCode);
        tax.setTaxRate(taxRate.getRatePercentage());
        tax.setTaxAmount(taxAmount);

        line.addTax(tax);
    }


}
