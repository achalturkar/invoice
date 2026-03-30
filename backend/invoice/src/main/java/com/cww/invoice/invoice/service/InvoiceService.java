package com.cww.invoice.invoice.service;

import com.cww.invoice.bankAccount.Repository.BankAccountRepository;
import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.employee.repository.EmployeeRepository;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.client.repository.ClientRepository;
import com.cww.invoice.common.service.PdfGeneratorService;
import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.invoice.dto.*;
import com.cww.invoice.invoice.entity.Invoice;
import com.cww.invoice.invoice.entity.InvoiceStatus;
import com.cww.invoice.invoice.repository.InvoiceRepository;
import com.cww.invoice.invoiceItems.dto.InvoiceItemRequestDto;
import com.cww.invoice.invoiceItems.dto.InvoiceItemResponseDto;
import com.cww.invoice.invoiceItems.entity.InvoiceItem;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CompanyRepository companyRepository;
    private final ClientRepository clientRepository;
    private final EmployeeRepository employeeRepository;
    private final PdfGeneratorService pdfService;
    private final StorageService storageService;
    private final BankAccountRepository bankDetailRepository;

    /* ================= CREATE ================= */

//    @Transactional
//    public InvoiceDetailDto createInvoice(UUID companyId, InvoiceRequestDto dto) {
//
//        Company company = companyRepository.findById(companyId)
//                .orElseThrow(() -> new RuntimeException("Company not found"));
//
//        Client client = clientRepository.findById(dto.getClientId())
//                .orElseThrow(() -> new RuntimeException("Client not found"));
//
//
//        Invoice invoice = new Invoice();
//        invoice.setCompany(company);
//        invoice.setClient(client);
//        invoice.setInvoiceNumber(generateInvoiceNumber(company));
//        invoice.setInvoiceDate(dto.getInvoiceDate());
//        invoice.setPoNumber(dto.getPoNumber());
//        invoice.setDueDate(dto.getDueDate());
//        invoice.setStatus(InvoiceStatus.DRAFT);
//        invoice.setGstApplicable(dto.isGstApplicable());
//
//        BigDecimal subTotal = BigDecimal.ZERO;
//        BigDecimal cgst = BigDecimal.ZERO;
//        BigDecimal sgst = BigDecimal.ZERO;
//
//        for (InvoiceItemRequestDto itemDto : dto.getItems()) {
//
//            Employee employee = employeeRepository.findById(itemDto.getEmployeeId())
//                    .orElseThrow(() -> new RuntimeException("Candidate not found"));
//
//            InvoiceItem item = new InvoiceItem();
//            item.setInvoice(invoice);
//            item.setEmployee(employee);
//            item.setResourceName(employee.getFullName());
//            item.setPeriodFrom(itemDto.getPeriodFrom());
//            item.setPeriodTo(itemDto.getPeriodTo());
//            item.setHsn(itemDto.getHsn());
//            item.setWorkingHours(itemDto.getWorkingHours());
//            item.setRatePerHour(itemDto.getRatePerHour());
//
//            BigDecimal amount =
//                    itemDto.getRatePerHour()
//                            .multiply(BigDecimal.valueOf(itemDto.getWorkingHours()));
//
//            item.setTotalAmount(amount);
//
//            BigDecimal gstAmount = BigDecimal.ZERO;
//
//            if (dto.isGstApplicable()) {
//                gstAmount = amount
//                        .multiply(BigDecimal.valueOf(dto.getGstPercent()))
//                        .divide(BigDecimal.valueOf(100));
//            }
//
//            BigDecimal itemCgst = gstAmount.divide(BigDecimal.valueOf(2));
//            BigDecimal itemSgst = gstAmount.divide(BigDecimal.valueOf(2));
//
//            item.setCgstAmount(itemCgst);
//            item.setSgstAmount(itemSgst);
//            item.setTaxAmount(itemCgst.add(itemSgst));
//            item.setTotalAmount(amount.add(itemCgst).add(itemSgst));
//
//            invoice.getItems().add(item);
//
//            subTotal = subTotal.add(amount);
//            cgst = cgst.add(itemCgst);
//            sgst = sgst.add(itemSgst);
//
//        }
//
//        invoice.setSubTotal(subTotal);
//        invoice.setCgstAmount(cgst);
//        invoice.setSgstAmount(sgst);
//        invoice.setTaxAmount(cgst.add(sgst));
//
//        invoice.setTotalAmount(subTotal.add(cgst).add(sgst));
//
//        invoiceRepository.save(invoice);
//
//        byte[] pdf = pdfService.generateInvoicePdf(invoice);
////        String pdfPath = storageService.uploadPdf(
////                pdf,
////                "invoices/" + invoice.getInvoiceNumber() + ".pdf"
////        );
////
////        invoice.setPdfPath(pdfPath);
//        Year year = Year.now();
//
//        String relativePath =
//                "invoices/"
//                        + company.getCompanyCode() + "/"   // CWW
//                        + year + "/"
//                        + System.currentTimeMillis()
//                        + ".pdf";
//
//        String storedPath = storageService.uploadPdf(pdf, relativePath);
//
//        invoice.setPdfPath(storedPath);
//        invoiceRepository.save(invoice);
//
//
//        return mapToDetailDto(invoice);
//    }

    @Transactional
    public InvoiceDetailDto createInvoice(UUID companyId, InvoiceRequestDto dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Invoice invoice = new Invoice();
        invoice.setCompany(company);
        invoice.setClient(client);

        invoice.setInvoiceDate(dto.getInvoiceDate());
        invoice.setPoNumber(dto.getPoNumber());
        invoice.setDueDate(dto.getDueDate());
        invoice.setStatus(InvoiceStatus.DRAFT);
        invoice.setGstApplicable(dto.isGstApplicable());

        /* ================= INVOICE NUMBER LOGIC ================= */

        int year = dto.getInvoiceDate().getYear();

        Long maxSequence = invoiceRepository
                .findMaxSequence(company.getId(), year);

        Long nextSequence = maxSequence + 1;

        invoice.setSequenceNumber(nextSequence);

        String invoiceNumber =
                company.getCompanyCode()
                        + "/" + getFinancialYear(dto.getInvoiceDate())
                        + "/" + nextSequence;

        invoice.setInvoiceNumber(invoiceNumber);

        /* ================= ITEMS CALCULATION ================= */

        BigDecimal subTotal = BigDecimal.ZERO;
        BigDecimal cgst = BigDecimal.ZERO;
        BigDecimal sgst = BigDecimal.ZERO;

        for (InvoiceItemRequestDto itemDto : dto.getItems()) {

            Employee employee = employeeRepository.findById(itemDto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            InvoiceItem item = new InvoiceItem();
            item.setInvoice(invoice);
            item.setEmployee(employee);
            item.setResourceName(employee.getFullName());
            item.setPeriodFrom(itemDto.getPeriodFrom());
            item.setPeriodTo(itemDto.getPeriodTo());
            item.setHsn(itemDto.getHsn());
            item.setWorkingHours(itemDto.getWorkingHours());
            item.setRatePerHour(itemDto.getRatePerHour());

            BigDecimal amount = itemDto.getRatePerHour()
                    .multiply(BigDecimal.valueOf(itemDto.getWorkingHours()));

            BigDecimal gstAmount = BigDecimal.ZERO;

            if (dto.isGstApplicable()) {
                gstAmount = amount
                        .multiply(BigDecimal.valueOf(dto.getGstPercent()))
                        .divide(BigDecimal.valueOf(100));
            }

            BigDecimal itemCgst = gstAmount.divide(BigDecimal.valueOf(2));
            BigDecimal itemSgst = gstAmount.divide(BigDecimal.valueOf(2));

            item.setCgstAmount(itemCgst);
            item.setSgstAmount(itemSgst);
            item.setTaxAmount(itemCgst.add(itemSgst));
            item.setTotalAmount(amount.add(itemCgst).add(itemSgst));

            invoice.getItems().add(item);

            subTotal = subTotal.add(amount);
            cgst = cgst.add(itemCgst);
            sgst = sgst.add(itemSgst);
        }

        invoice.setSubTotal(subTotal);
        invoice.setCgstAmount(cgst);
        invoice.setSgstAmount(sgst);
        invoice.setTaxAmount(cgst.add(sgst));
        invoice.setTotalAmount(subTotal.add(cgst).add(sgst));

        invoiceRepository.save(invoice);

        /* ================= PDF GENERATION ================= */

        byte[] pdf = pdfService.generateInvoicePdf(invoice);

        String relativePath =
                "invoices/"
                        + company.getCompanyCode()
                        + "/" + Year.now()
                        + "/" + invoice.getInvoiceNumber()
                        + ".pdf";

        String storedPath = storageService.uploadPdf(pdf, relativePath);

        invoice.setPdfPath(storedPath);
        invoiceRepository.save(invoice);

        return mapToDetailDto(invoice);
    }


    /* ================= GET ALL ================= */

    @Transactional
    public List<InvoiceListDto> getAllInvoices(UUID companyId) {

        return invoiceRepository
                .findByCompanyIdOrderByCreatedAtDesc(companyId)
                .stream()
                .map(this::mapToListDto)
                .toList();
    }

//    @Transactional
//    public Page<InvoiceListDto> getInvoices(UUID companyId, Pageable pageable) {
//
//        return invoiceRepository.findAllInvoice(companyId, pageable)
//
//    }

    /* ================= GET BY ID ================= */

    @Transactional
    public InvoiceDetailDto getInvoiceById(UUID companyId, UUID invoiceId) {

        Invoice invoice = invoiceRepository
                .findByIdAndCompanyId(invoiceId, companyId)
                .orElseThrow(() -> new RuntimeException("Invoice Not Found"));

        return mapToDetailDto(invoice);
    }

    /* ================= DELETE ================= */

    @Transactional
    public void deleteInvoice(UUID companyId, UUID invoiceId) {

        Invoice invoice = invoiceRepository
                .findByIdAndCompanyId(invoiceId, companyId)
                .orElseThrow(() -> new RuntimeException("Invoice Not Found"));

//        storageService.delete(invoice.getPdfPath());
        invoiceRepository.delete(invoice);
    }

    @Transactional
    public void updateStatus(UUID companyId, UUID invoiceId, String status) {

        Invoice invoice = invoiceRepository
                .findByIdAndCompanyId(invoiceId, companyId)
                .orElseThrow(() -> new RuntimeException("Invoice Not Found"));

        invoice.setStatus(InvoiceStatus.valueOf(status));
    }

    //view and download

    @Transactional
    public FileResponse getInvoiceFile(UUID companyId, UUID invoiceId) {

        Invoice invoice = invoiceRepository
                .findByIdAndCompanyId(invoiceId, companyId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        Path filePath = storageService.resolvePath(invoice.getPdfPath());

        if (!Files.exists(filePath)) {
            throw new RuntimeException("Invoice file missing");
        }

        try {
            Resource resource = new UrlResource(filePath.toUri());

            return new FileResponse(
                    resource,
                    "invoice-" + invoice.getInvoiceNumber() + ".pdf",
                    MediaType.APPLICATION_PDF
            );

        } catch (MalformedURLException e) {
            throw new RuntimeException("File error", e);
        }
    }


    public Page<InvoiceResponseDto> getClientInvoice(UUID clientId, Pageable pageable) {

        return invoiceRepository.findByClient_Id(clientId, pageable)
                .map(invoice -> InvoiceResponseDto.builder()
                        .id(invoice.getId())
                        .clientName(invoice.getClient().getClientName())
                        .invoiceNumber(invoice.getInvoiceNumber())
                        .invoiceDate(invoice.getInvoiceDate())
                        .subTotal(invoice.getSubTotal())
                        .cgstAmount(invoice.getCgstAmount())
                        .sgstAmount(invoice.getSgstAmount())
                        .totalAmount(invoice.getTotalAmount())
                        .status(invoice.getStatus())
                        .pdfPath(invoice.getPdfPath())
                        .build()
                );
    }



    /* ================= MAPPERS ================= */

    private InvoiceListDto mapToListDto(Invoice invoice) {
        return InvoiceListDto.builder()
                .id(invoice.getId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .invoiceDate(String.valueOf(invoice.getInvoiceDate()))
                .clientName(invoice.getClient().getClientName())
                .totalAmount(invoice.getTotalAmount())
//                .totalAmount(invoice.getTotalTaxAmount())
                .status(invoice.getStatus())
                .pdfPath(invoice.getPdfPath())
                .build();
    }

    private InvoiceDetailDto mapToDetailDto(Invoice invoice) {

        List<InvoiceItemResponseDto> items =
                invoice.getItems().stream()
                        .map(i -> InvoiceItemResponseDto.builder()
                                .employeeName(i.getEmployee().getFullName())
                                .workingHours(i.getWorkingHours())
                                .ratePerHour(i.getRatePerHour())
                                .amount(i.getAmount())
                                .hsn(i.getHsn())
                                .periodFrom(i.getPeriodFrom())
                                .periodTo(i.getPeriodTo())
                                .build())
                        .toList();

        return InvoiceDetailDto.builder()
                .id(invoice.getId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .invoiceDate(invoice.getInvoiceDate())
                .poNumber(invoice.getPoNumber())
                .dueDate(invoice.getDueDate())
                .clientName(invoice.getClient().getClientName())
                .subTotal(invoice.getSubTotal())
                .cgstAmount(invoice.getCgstAmount())
                .sgstAmount(invoice.getSgstAmount())
                .totalAmount(invoice.getTotalAmount())
                .status(invoice.getStatus())
                .pdfPath(invoice.getPdfPath())
                .items(items)
                .build();
    }

//    private String generateInvoiceNumber(Company company) {
//
//        String financialYear = getFinancialYear();
//
//        Long maxSequence = invoiceRepository
//                .findMaxSequence(company.getId(), LocalDate.now().getYear());
//
//        Long nextSequence = maxSequence + 1;
//
//        return company.getCompanyCode()
//                + "/" + financialYear
//                + "/" + nextSequence;
//    }



    private String getFinancialYear(LocalDate date) {

        int year = date.getYear();
        int month = date.getMonthValue();

        if (month < 4) {
            return (year - 1) % 100 + "-" + year % 100;
        }

        return year % 100 + "-" + (year + 1) % 100;
    }


}
