package com.cww.invoice.common.service;

import com.cww.invoice.bankAccount.entity.BankAccount;
import com.cww.invoice.bankAccount.entity.BankAccountStatus;
import com.cww.invoice.client.entity.AddressType;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.client.entity.ClientAddress;
import com.cww.invoice.common.util.AmountToWords;
import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.invoice.entity.Invoice;
import com.openhtmltopdf.css.parser.property.PageSize;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.util.List;


@Service
@RequiredArgsConstructor
public class PdfGeneratorService {

    private final TemplateEngine templateEngine;
    private final StorageService storageService;

    public byte[] generateInvoicePdf(Invoice invoice) {

        Company company = invoice.getCompany();
        Client client = invoice.getClient();

        ClientAddress billingAddress = null;
        ClientAddress shippingAddress = null;

        if (client.getAddresses() != null) {
            billingAddress = client.getAddresses().stream()
                    .filter(a -> a.getAddressType() == AddressType.BILLING && Boolean.TRUE.equals(a.getIsPrimary()))
                    .findFirst().orElse(null);

            shippingAddress = client.getAddresses().stream()
                    .filter(a -> a.getAddressType() == AddressType.SHIPPING && Boolean.TRUE.equals(a.getIsPrimary()))
                    .findFirst().orElse(null);
        }

        BankAccount bankAccount = null;
        if (company.getBankAccounts() != null) {
            bankAccount = company.getBankAccounts().stream()
                    .filter(b -> b.getStatus() == BankAccountStatus.ACTIVE)
                    .findFirst().orElse(null);
        }

        Context context = new Context();
        context.setVariable("invoice", invoice);
        context.setVariable("company", company);
        context.setVariable("client", client);
        context.setVariable("billingAddress", billingAddress);
        context.setVariable("shippingAddress", shippingAddress);
        context.setVariable("bankAccount", bankAccount);

        // ✅ USE RELATIVE PATH
        context.setVariable("logoPath", company.getLogoPath());
        context.setVariable("signPath", company.getSignPath());

        context.setVariable(
                "amountInWords",
                AmountToWords.convert(invoice.getTotalAmount().doubleValue())
        );

//        String html = templateEngine.process("invoice-template", context);
          String html = templateEngine.process("invoice-bh", context);



        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.useFastMode();

        // 🔥 KEY FIX
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
