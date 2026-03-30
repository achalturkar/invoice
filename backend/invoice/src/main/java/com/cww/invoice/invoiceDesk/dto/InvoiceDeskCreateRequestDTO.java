package com.cww.invoice.invoiceDesk.dto;

import com.cww.invoice.invoiceDesk.enums.InvoiceNature;
import com.cww.invoice.invoiceDesk.enums.PaymentTerm;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class InvoiceDeskCreateRequestDTO {

        // Header
        private UUID companyId;
        private UUID clientId;
        private UUID bankAccountId;
        private UUID currencyId;


        private LocalDate invoiceDate;
        private LocalDate dueDate;

        private InvoiceNature invoiceNature; // STANDARD / CREDIT / DEBIT
        private PaymentTerm paymentTerm; // IMMEDIATE / NET_15 / NET_30

        private String poNumber;
        private String description;
        private Boolean reverseCharge;

        // Lines
        private List<InvoiceLineRequestDTO> lines;

        // Export (Optional)
        private ExportDetailsDTO exportDetails;

}
