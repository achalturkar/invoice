package com.cww.invoice.common.service;

import com.cww.invoice.client.dto.ClientAddressResponseDTO;
import com.cww.invoice.client.dto.ClientResponseDTO;
import com.cww.invoice.client.entity.AddressType;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.client.entity.ClientAddress;
import com.cww.invoice.common.util.AmountToWords;
import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.company.dto.CompanyResponseDto;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.invoiceDesk.dto.InvoiceDeskResponseDTO;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;

@Service
@RequiredArgsConstructor
public class InvoiceDeskPdfService {

    private final TemplateEngine templateEngine;
    private final StorageService storageService;

    public byte[] generatePdf(InvoiceDeskResponseDTO invoice) {

        /* ================= BILLING / SHIPPING ================= */

        CompanyResponseDto company = invoice.getCompany();
        ClientResponseDTO client = invoice.getClient();

        ClientAddressResponseDTO billingAddress = null;
        ClientAddressResponseDTO shippingAddress = null;

        if (invoice.getClient().getClientAddresses() != null) {

            billingAddress = invoice.getClient()
                    .getClientAddresses()
                    .stream()
                    .filter(a -> a.getAddressType() == AddressType.BILLING
                            && Boolean.TRUE.equals(a.getIsPrimary()))
                    .findFirst()
                    .orElse(null);

            shippingAddress = invoice.getClient()
                    .getClientAddresses()
                    .stream()
                    .filter(a -> a.getAddressType() == AddressType.SHIPPING
                            && Boolean.TRUE.equals(a.getIsPrimary()))
                    .findFirst()
                    .orElse(null);
        }

        /* ================= THYMELEAF CONTEXT ================= */

        Context context = new Context();

        context.setVariable("invoice", invoice);
        context.setVariable("company", invoice.getCompany());
        context.setVariable("client", invoice.getClient());
        context.setVariable("currency", invoice.getCurrency());
        context.setVariable("bank", invoice.getBank());

        context.setVariable("billingAddress", billingAddress);
        context.setVariable("shippingAddress", shippingAddress);

        // ✅ USE RELATIVE PATH
        context.setVariable("logoPath", company.getLogoPath());
        context.setVariable("signPath", company.getSignPath());

        context.setVariable(
                "amountInWords",
                AmountToWords.convert(
                        invoice.getGrandTotal().doubleValue()
                )
        );



        /* ================= PROCESS TEMPLATE ================= */

        String html = templateEngine.process("invoice", context);

        /* ================= BUILD PDF ================= */

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        PdfRendererBuilder builder = new PdfRendererBuilder();

        builder.useFastMode();

        builder.withHtmlContent(
                html,
                storageService.resolvePath("").toUri().toString()
        );

        builder.toStream(outputStream);

        try {
            builder.run();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate invoice PDF", e);
        }

        return outputStream.toByteArray();
    }
}
