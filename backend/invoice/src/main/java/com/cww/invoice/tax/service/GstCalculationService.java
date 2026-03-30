package com.cww.invoice.tax.service;

import com.cww.invoice.invoiceDesk.entity.InvoiceDesk;
import com.cww.invoice.invoiceDesk.entity.InvoiceResource;
import com.cww.invoice.invoiceDesk.entity.InvoiceResourceTax;
import com.cww.invoice.invoiceDesk.entity.InvoiceTax;
import com.cww.invoice.invoiceDesk.enums.InvoiceSupplyType;
import com.cww.invoice.invoiceDesk.repository.InvoiceTaxRepository;
import com.cww.invoice.tax.entity.TaxMaster;
import com.cww.invoice.tax.entity.TaxRate;
import com.cww.invoice.tax.repository.TaxMasterRepository;
import com.cww.invoice.tax.repository.TaxRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GstCalculationService {

    private final TaxMasterRepository taxMasterRepository;
    private final TaxRateRepository taxRateRepository;
    private final InvoiceTaxRepository invoiceTaxRepository;

    public List<InvoiceTax> calculateTax(InvoiceDesk invoiceDesk) {

        List<InvoiceTax> taxes = new ArrayList<>();
        BigDecimal taxableAmount = invoiceDesk.getSubtotal();

        InvoiceSupplyType supplyType = invoiceDesk.getSupplyType();

        switch (supplyType) {

            case INTRA -> {
                taxes.add(createTax(invoiceDesk, taxableAmount, "CGST"));
                taxes.add(createTax(invoiceDesk, taxableAmount, "SGST"));
            }

            case INTER -> {
                taxes.add(createTax(invoiceDesk, taxableAmount, "IGST"));
            }

            case INTERNATIONAL -> {
                // Export under LUT → No tax
            }
        }

        return taxes;
    }

    private InvoiceTax createTax(
            InvoiceDesk invoiceDesk,
            BigDecimal taxableAmount,
            String taxCode
    ) {

        TaxMaster taxMaster = taxMasterRepository.findByTaxCode(taxCode)
                .orElseThrow(() -> new RuntimeException("TaxMaster not found: " + taxCode));

        TaxRate taxRate = taxRateRepository
                .findTopByTax_IdOrderByEffectiveFromDesc(taxMaster.getId())
                .orElseThrow(() -> new RuntimeException("TaxRate not found: " + taxCode));

        BigDecimal taxAmount = taxableAmount
                .multiply(taxRate.getRatePercentage())
                .divide(BigDecimal.valueOf(100));



        return InvoiceTax.builder()
                .tax(taxMaster)
                .taxRate(taxRate.getRatePercentage())
                .taxAmount(taxAmount)
                .build();

    }
}

//@Service
//@RequiredArgsConstructor
//public class GSTCalculationService {
//
//    private final TaxMasterRepository taxMasterRepository;
//
//    public TaxSummary calculateGST(List<InvoiceItem> items) {
//
//        BigDecimal totalTaxable = BigDecimal.ZERO;
//        BigDecimal totalCgst = BigDecimal.ZERO;
//        BigDecimal totalSgst = BigDecimal.ZERO;
//        BigDecimal totalIgst = BigDecimal.ZERO;
//
//        for (InvoiceItem item : items) {
//
//            BigDecimal taxableAmount =
//                    item.getQuantity().multiply(item.getRate());
//
//            totalTaxable = totalTaxable.add(taxableAmount);
//
//            TaxMaster taxMaster = taxMasterRepository
//                    .findByTaxCodeAndActiveTrue(item.getTaxCode())
//                    .orElseThrow(() ->
//                            new RuntimeException("Tax not found for code: " + item.getTaxCode()));
//
//            if ("CGST_SGST".equals(item.getTaxCode())) {
//
//                BigDecimal cgst = taxableAmount
//                        .multiply(taxMaster.getCgstRate())
//                        .divide(BigDecimal.valueOf(100));
//
//                BigDecimal sgst = taxableAmount
//                        .multiply(taxMaster.getSgstRate())
//                        .divide(BigDecimal.valueOf(100));
//
//                totalCgst = totalCgst.add(cgst);
//                totalSgst = totalSgst.add(sgst);
//
//            } else if ("IGST".equals(item.getTaxCode())) {
//
//                BigDecimal igst = taxableAmount
//                        .multiply(taxMaster.getIgstRate())
//                        .divide(BigDecimal.valueOf(100));
//
//                totalIgst = totalIgst.add(igst);
//            }
//        }
//
//        return new TaxSummary(
//                totalTaxable,
//                totalCgst,
//                totalSgst,
//                totalIgst
//        );
//    }
//}
//
