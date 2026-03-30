package com.cww.invoice.invoiceDesk.controller;

import com.cww.invoice.common.service.InvoiceDeskPdfService;
import com.cww.invoice.invoice.dto.FileResponse;
import com.cww.invoice.invoiceDesk.dto.InvoiceDeskCreateRequestDTO;
import com.cww.invoice.invoiceDesk.dto.InvoiceDeskResponseDTO;
import com.cww.invoice.invoiceDesk.entity.InvoiceDesk;
import com.cww.invoice.invoiceDesk.enums.InvoiceStatus;
import com.cww.invoice.invoiceDesk.service.InvoiceDeskService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/companies/{companyId}/invoices/desk")
@RequiredArgsConstructor
public class InvoiceDeskController {

    private final InvoiceDeskService invoiceDeskService;
    private final InvoiceDeskPdfService pdfService;



    @PostMapping
    public InvoiceDeskResponseDTO createInvoice(
            @PathVariable UUID companyId,
            @RequestBody InvoiceDeskCreateRequestDTO dto
    ) {
        return invoiceDeskService.createDraftInvoice(companyId, dto);
    }

    @PutMapping("update/{invoiceId}")
    public InvoiceDeskResponseDTO updateDraftInvoice(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId,
            @RequestBody InvoiceDeskCreateRequestDTO dto
    ) {
        return invoiceDeskService.updateDraftInvoice(companyId, invoiceId, dto);
    }


    /* ================= FINALIZE ================= */

    @PostMapping("/{invoiceId}/finalize")
    public ResponseEntity<InvoiceDeskResponseDTO> finalizeInvoice(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId) {

        InvoiceDeskResponseDTO response =
                invoiceDeskService.finalizeInvoice(invoiceId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{invoiceId}/pdf")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable UUID invoiceId) {

        InvoiceDeskResponseDTO invoice =
                invoiceDeskService.getInvoice(invoiceId);

        byte[] pdf = pdfService.generatePdf(invoice);

        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition",
                        "inline; filename=invoice.pdf")
                .body(pdf);
    }

   @GetMapping("/all")
    public List<InvoiceDeskResponseDTO> getAllInvoiceDesk(@PathVariable UUID companyId){

        return invoiceDeskService.getAllInvoice(companyId);
   }

   @GetMapping
    public List<InvoiceDeskResponseDTO> getAllFinalInvoiceDesk(
            @PathVariable UUID companyId,
            @RequestParam(required = false) InvoiceStatus status){
        return invoiceDeskService.getInvoices(companyId, status);
   }


   @DeleteMapping("/{invoiceId}")
    public void deleteInvoiceDesk(@PathVariable UUID companyId,
                                  @PathVariable UUID invoiceId){

        invoiceDeskService.deleteInvoiceDeskById(companyId, invoiceId);
   }

    /* ================= VIEW INVOICE ================= */
    @GetMapping("/{invoiceId}/view")
    public ResponseEntity<Resource> viewInvoice(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId
    ) {
        FileResponse file = invoiceDeskService.getInvoiceFile(companyId, invoiceId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + file.getFileName() + "\"")
                .body(file.getResource());
    }

    /* ================= DOWNLOAD INVOICE ================= */
    @GetMapping("/{invoiceId}/download")
    public ResponseEntity<Resource> downloadInvoice(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId
    ) {
        FileResponse file = invoiceDeskService.getInvoiceFile(companyId, invoiceId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFileName() + "\"")
                .body(file.getResource());
    }


}
