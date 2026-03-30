package com.cww.invoice.invoiceDesk.dto;

import com.cww.invoice.bankAccount.dto.BankDetailsResponseDto;
import com.cww.invoice.employee.dto.EmployeeResponseDto;
import com.cww.invoice.client.dto.ClientResponseDTO;
import com.cww.invoice.company.dto.CompanyResponseDto;
import com.cww.invoice.currency.dto.CurrencyResponseDTO;
import com.cww.invoice.invoiceDesk.enums.InvoiceNature;
import com.cww.invoice.invoiceDesk.enums.InvoiceStatus;
import com.cww.invoice.invoiceDesk.enums.InvoiceSupplyType;
import com.cww.invoice.invoiceDesk.enums.PaymentTerm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class InvoiceDeskResponseDTO {


    // ===== BASIC =====
    private UUID invoiceId;
    private String invoiceNumber;
    private InvoiceStatus status;


    // ===== COMPANY =====
    private CompanyResponseDto company;


    // ===== CLIENT =====
    private ClientResponseDTO client;


    // ===== HEADER =====
    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private PaymentTerm paymentTerm;
    private InvoiceNature invoiceNature;
    private InvoiceSupplyType supplyType;


    private String poNumber;
    private String description;
    private Boolean reverseCharge;


    // ===== CURRENCY =====
    private CurrencyResponseDTO currency;

    private EmployeeResponseDto candidate;

    private BankDetailsResponseDto bank;


    // ===== LINES =====
    private List<InvoiceLineResponseDTO> lines;


    // ===== TAX SUMMARY =====
    private List<TaxSummaryDTO> taxSummary;


    // ===== TOTALS =====
    private BigDecimal subtotal;
    private BigDecimal totalTax;
    private BigDecimal grandTotal;


    // ===== EXPORT =====
    private ExportDetailsDTO exportDetails;


    // ===== PDF =====
    private String pdfPath;
}


