package com.cww.invoice.tax.service;

import com.cww.invoice.client.entity.ClientAddress;
import com.cww.invoice.company.entity.CompanyAddress;
import com.cww.invoice.invoiceDesk.entity.InvoiceDesk;
import com.cww.invoice.invoiceDesk.enums.InvoiceSupplyType;
import com.cww.invoice.location.entity.Country;
import com.cww.invoice.location.entity.State;
import org.springframework.stereotype.Service;

@Service
public class GstDecisionService {

    private static final String INDIA_ISO = "IN";
//
//    public InvoiceSupplyType decideInvoiceType(InvoiceDesk invoiceDesk) {
//
//        CompanyAddress sellerAddress = invoiceDesk.getCompany()
//                .getAddresses()
//                .stream()
//                .filter(CompanyAddress::getIsPrimary)
//                .findFirst()
//                .orElseThrow(() -> new IllegalStateException("Primary company address not found"));
//
//        ClientAddress buyerAddress = invoiceDesk.getClient()
//                .getAddresses()
//                .stream()
//                .filter(addr -> addr.getIsPrimary())
//                .findFirst()
//                .orElseThrow(() -> new IllegalStateException("Primary client address not found"));
//
//        Country sellerCountry = sellerAddress.getCountry();
//        Country buyerCountry  = buyerAddress.getCountry();
//
//        State sellerState = sellerAddress.getState();
//        State buyerState  = buyerAddress.getState();
//
//        /* ================= INTERNATIONAL ================= */
//        if (!INDIA_ISO.equalsIgnoreCase(buyerCountry.getIsoCode())) {
//            return InvoiceSupplyType.INTERNATIONAL;
//        }
//
//        /* ================= INTER STATE ================= */
//        if (!sellerState.getStateCode().equals(buyerState.getStateCode())) {
//            return InvoiceSupplyType.INTER;
//        }
//
//        /* ================= INTRA STATE ================= */
//        return InvoiceSupplyType.INTRA;
//    }
//}


    public InvoiceSupplyType decideInvoiceType(InvoiceDesk invoiceDesk) {

        if (invoiceDesk == null) {
            throw new IllegalArgumentException("Invoice cannot be null");
        }

        if (invoiceDesk.getCompany() == null) {
            throw new IllegalStateException("Company not attached to invoice");
        }

        if (invoiceDesk.getClient() == null) {
            throw new IllegalStateException("Client not attached to invoice");
        }

        if (invoiceDesk.getCompany().getAddresses() == null ||
                invoiceDesk.getCompany().getAddresses().isEmpty()) {
            throw new IllegalStateException("Company addresses missing");
        }

        if (invoiceDesk.getClient().getAddresses() == null ||
                invoiceDesk.getClient().getAddresses().isEmpty()) {
            throw new IllegalStateException("Client addresses missing");
        }

        CompanyAddress sellerAddress = invoiceDesk.getCompany()
                .getAddresses()
                .stream()
                .filter(addr -> Boolean.TRUE.equals(addr.getIsPrimary()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Primary company address not found"));

        ClientAddress buyerAddress = invoiceDesk.getClient()
                .getAddresses()
                .stream()
                .filter(addr -> Boolean.TRUE.equals(addr.getIsPrimary()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Primary client address not found"));

        if (sellerAddress.getCountry() == null || buyerAddress.getCountry() == null) {
            throw new IllegalStateException("Country missing in address");
        }

        if (sellerAddress.getState() == null || buyerAddress.getState() == null) {
            throw new IllegalStateException("State missing in address");
        }

        /* ================= INTERNATIONAL ================= */
        if (!INDIA_ISO.equalsIgnoreCase(buyerAddress.getCountry().getIsoCode())) {
            return InvoiceSupplyType.INTERNATIONAL;
        }

        /* ================= INTER STATE ================= */
        if (!sellerAddress.getState().getStateCode()
                .equals(buyerAddress.getState().getStateCode())) {
            return InvoiceSupplyType.INTER;
        }

        /* ================= INTRA STATE ================= */
        return InvoiceSupplyType.INTRA;
    }
}
