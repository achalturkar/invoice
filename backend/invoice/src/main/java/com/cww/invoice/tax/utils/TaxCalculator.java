//package com.cww.invoice.tax.utils;
//
//import com.cww.invoice.client.entity.Client;
//import com.cww.invoice.company.entity.Company;
//import org.springframework.stereotype.Component;
//
//import java.math.BigDecimal;
//
//@Component
//public class TaxCalculator {
//
//
//    public TaxBreakup calculate(Company company, Client client, BigDecimal taxableAmount, BigDecimal taxRate) {
//        TaxBreakup tax = new TaxBreakup();
//
//
//        if (!client.getCountry().equalsIgnoreCase("India")) {
//            tax.setTotalTax(BigDecimal.ZERO);
//            return tax;
//        }
//
//
//        if (company.getState().equals(client.getState())) {
//            BigDecimal half = taxRate.divide(BigDecimal.valueOf(2));
//            tax.setCgst(taxableAmount.multiply(half).divide(BigDecimal.valueOf(100)));
//            tax.setSgst(taxableAmount.multiply(half).divide(BigDecimal.valueOf(100)));
//        } else {
//            tax.setIgst(taxableAmount.multiply(taxRate).divide(BigDecimal.valueOf(100)));
//        }
//        tax.calculateTotal();
//        return tax;
//    }
//}
