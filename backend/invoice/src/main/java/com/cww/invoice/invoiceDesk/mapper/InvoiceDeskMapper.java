package com.cww.invoice.invoiceDesk.mapper;

import com.cww.invoice.bankAccount.mapper.BankMapper;
import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.client.mapper.ClientMapper;
import com.cww.invoice.company.mapper.CompanyMapper;
import com.cww.invoice.currency.mapper.CurrencyMapper;
import com.cww.invoice.invoiceDesk.dto.*;
import com.cww.invoice.invoiceDesk.entity.*;
import com.cww.invoice.invoiceDesk.enums.InvoiceStatus;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class InvoiceDeskMapper {

    private InvoiceDeskMapper() {
    }

    /* =====================================================
       REQUEST → ENTITY
    ===================================================== */

    public static InvoiceDesk toEntity(InvoiceDeskCreateRequestDTO dto) {

        InvoiceDesk invoice = new InvoiceDesk();

        invoice.setInvoiceDate(dto.getInvoiceDate());
        invoice.setDueDate(dto.getDueDate());
        invoice.setInvoiceNature(dto.getInvoiceNature());
        invoice.setPaymentTerm(dto.getPaymentTerm());
        invoice.setPoNumber(dto.getPoNumber());
        invoice.setDescription(dto.getDescription());
        invoice.setReverseCharge(dto.getReverseCharge());

        invoice.setStatus(InvoiceStatus.DRAFT);

        return invoice;
    }

    /* =====================================================
       LINE → ENTITY
    ===================================================== */

    public static InvoiceResource toLineEntity(
            InvoiceLineRequestDTO dto,
            InvoiceDesk invoice,
            Employee employee
    ) {

        InvoiceResource line = new InvoiceResource();
        line.setInvoiceDesk(invoice);

        // ===== RESOURCE / CANDIDATE =====
        if (employee != null) {
            line.setEmployee(employee);
            line.setResourceName(employee.getFullName());
        } else {
            line.setResourceName(
                    dto.getResourceName() != null
                            ? dto.getResourceName()
                            : "RESOURCE"
            );
        }
        line.setSac(dto.getSac());
        line.setPeriodFrom(dto.getPeriodFrom());
        line.setPeriodTo(dto.getPeriodTo());

        // ===== BIGDECIMAL SAFE HANDLING =====
        BigDecimal quantity =
                dto.getQuantity() != null
                        ? dto.getQuantity()
                        : BigDecimal.ONE;

        BigDecimal unitPrice =
                dto.getUnitPrice() != null
                        ? dto.getUnitPrice()
                        : BigDecimal.ZERO;

        line.setQuantity(quantity);
        line.setUnitPrice(unitPrice);

        // ===== LINE AMOUNT =====
        line.setLineAmount(
                unitPrice.multiply(quantity)
        );

        return line;
    }

    /* =====================================================
       EXPORT DETAILS
    ===================================================== */

    public static InvoiceExportDetails toExportEntity(
            ExportDetailsDTO dto,
            InvoiceDesk invoice
    ) {

        if (dto == null) return null;

        InvoiceExportDetails export = new InvoiceExportDetails();
        export.setInvoiceDesk(invoice);
        export.setLutNo(dto.getLutNo());
        export.setExportRemark(dto.getExportRemark());

        return export;
    }

    /* =====================================================
       ENTITY → FULL RESPONSE (UI + PDF)
    ===================================================== */

    public static InvoiceDeskResponseDTO toDetailResponse(
            InvoiceDesk invoice
    ) {

        InvoiceDeskResponseDTO dto = new InvoiceDeskResponseDTO();

        // ===== MASTER DATA =====
        dto.setCompany(CompanyMapper.mapToDto(invoice.getCompany()));
        dto.setClient(ClientMapper.mapToDto(invoice.getClient()));
        dto.setCurrency(CurrencyMapper.mapToDto(invoice.getCurrency()));
        dto.setBank(BankMapper.mapToDto(invoice.getBankAccount()));

        // ===== BASIC INFO =====
        dto.setInvoiceId(invoice.getId());
        dto.setInvoiceNumber(invoice.getInvoiceNumber());
        dto.setStatus(invoice.getStatus());

        dto.setInvoiceDate(invoice.getInvoiceDate());
        dto.setDueDate(invoice.getDueDate());
        dto.setPaymentTerm(invoice.getPaymentTerm());
        dto.setInvoiceNature(invoice.getInvoiceNature());
        dto.setSupplyType(invoice.getSupplyType());

        dto.setPoNumber(invoice.getPoNumber());
        dto.setDescription(invoice.getDescription());
        dto.setReverseCharge(invoice.isReverseCharge());

        // ===== AMOUNTS =====
        dto.setSubtotal(invoice.getSubtotal());
        dto.setTotalTax(invoice.getTotalTax());
        dto.setGrandTotal(invoice.getGrandTotal());
        dto.setPdfPath(invoice.getPdfPath());

        // ===== LINES =====
        dto.setLines(
                invoice.getResources()
                        .stream()
                        .map(InvoiceDeskMapper::toLineResponse)
                        .collect(Collectors.toList())
        );

        // ===== TAX SUMMARY =====
//        dto.setTaxSummary(
//                invoice.getTaxes()
//                        .stream()
//                        .map(InvoiceDeskMapper::toTaxSummary)
//                        .collect(Collectors.toList())
//        );

        dto.setTaxSummary(buildTaxSummary(invoice));


        // ===== EXPORT =====
        if (invoice.getExportDetails() != null) {
            ExportDetailsDTO exportDTO = new ExportDetailsDTO();
            exportDTO.setLutNo(invoice.getExportDetails().getLutNo());
            exportDTO.setExportRemark(invoice.getExportDetails().getExportRemark());
            dto.setExportDetails(exportDTO);
        }

        return dto;
    }

    /* =====================================================
       LINE → RESPONSE
    ===================================================== */

    private static InvoiceLineResponseDTO toLineResponse(
            InvoiceResource resource
    ) {

        InvoiceLineResponseDTO dto = new InvoiceLineResponseDTO();

        dto.setResourceName(resource.getResourceName());
        dto.setSac(resource.getSac());
        dto.setPeriodFrom(resource.getPeriodFrom());
        dto.setPeriodTo(resource.getPeriodTo());
        dto.setQuantity(resource.getQuantity());
        dto.setUnitPrice(resource.getUnitPrice());
        dto.setLineAmount(resource.getLineAmount());

        dto.setTaxes(
                resource.getTaxes()
                        .stream()
                        .map(t -> {
                            LineTaxDTO tax = new LineTaxDTO();
                            tax.setTaxCode(t.getTaxCode());
                            tax.setTaxRate(t.getTaxRate());
                            tax.setTaxAmount(t.getTaxAmount());
                            return tax;
                        })
                        .toList()
        );


        // Optional (future use)
//        dto.setTaxCode(resource.getTaxCode());
//        dto.setTaxRate(resource.getTaxRate());
//        dto.setTaxAmount(resource.getTaxAmount());

        return dto;
    }

    /* =====================================================
       TAX SUMMARY
    ===================================================== */

    private static List<TaxSummaryDTO> buildTaxSummary(InvoiceDesk invoice) {

        return invoice.getResources()
                .stream()
                .flatMap(resource -> resource.getTaxes().stream()
                        .map(tax -> {
                            TaxSummaryDTO dto = new TaxSummaryDTO();
                            dto.setTaxCode(tax.getTaxCode());
                            dto.setTaxRate(tax.getTaxRate());
                            dto.setTaxAmount(tax.getTaxAmount());
                            dto.setTaxableAmount(resource.getLineAmount());
                            return dto;
                        })
                )
                .collect(Collectors.groupingBy(
                        TaxSummaryDTO::getTaxCode
                ))
                .values()
                .stream()
                .map(list -> {

                    TaxSummaryDTO first = list.get(0);

                    BigDecimal taxable = list.stream()
                            .map(TaxSummaryDTO::getTaxableAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    BigDecimal taxAmt = list.stream()
                            .map(TaxSummaryDTO::getTaxAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    return new TaxSummaryDTO(
                            first.getTaxCode(),
                            taxable,
                            first.getTaxRate(),
                            taxAmt
                    );
                })
                .toList();
    }



    private static TaxSummaryDTO toTaxSummary(
            InvoiceTax tax
    ) {

        TaxSummaryDTO dto = new TaxSummaryDTO();

        dto.setTaxCode(tax.getTax().getTaxCode());
        dto.setTaxRate(tax.getTaxRate());
        dto.setTaxAmount(tax.getTaxAmount());
        dto.setTaxableAmount(tax.getInvoiceDesk().getSubtotal());

        return dto;
    }
}
