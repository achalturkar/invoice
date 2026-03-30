package com.cww.invoice.invoice.controller;

import com.cww.invoice.invoice.dto.*;
import com.cww.invoice.invoice.entity.Invoice;
import com.cww.invoice.invoice.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/company/{companyId}/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public InvoiceDetailDto create(
            @PathVariable UUID companyId,
            @RequestBody InvoiceRequestDto dto
    ) {
        return invoiceService.createInvoice(companyId, dto);
    }

    @GetMapping
    public List<InvoiceListDto> getAll(
            @PathVariable UUID companyId
    ) {
        return invoiceService.getAllInvoices(companyId);
    }

    @GetMapping("/{invoiceId}")
    public InvoiceDetailDto getById(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId
    ) {
        return invoiceService.getInvoiceById(companyId, invoiceId);
    }

    /* ================= VIEW INVOICE ================= */
    @GetMapping("/{invoiceId}/view")
    public ResponseEntity<Resource> viewInvoice(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId
    ) {
        FileResponse file = invoiceService.getInvoiceFile(companyId, invoiceId);

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
        FileResponse file = invoiceService.getInvoiceFile(companyId, invoiceId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFileName() + "\"")
                .body(file.getResource());
    }



    @GetMapping("/{clientId}/invoices")
    public Page<InvoiceResponseDto> getClientInvoice(
            @PathVariable UUID clientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size

    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "invoiceDate"));
        return invoiceService.getClientInvoice(clientId, pageable);
    }




    @PatchMapping("/{invoiceId}/status")
    public void updateStatus(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId,
            @RequestBody Map<String, String> body
    ) {
        invoiceService.updateStatus(companyId, invoiceId, body.get("status"));
    }

    @DeleteMapping("/{invoiceId}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID companyId,
            @PathVariable UUID invoiceId
    ) {
        invoiceService.deleteInvoice(companyId, invoiceId);
        return ResponseEntity.noContent().build();
    }

//    @PostMapping("/{invoiceId}/email")
//    public void emailInvoice(
//            @PathVariable UUID companyId,
//            @PathVariable UUID invoiceId
//    ) {
//        invoiceService.emailInvoice(companyId, invoiceId);
//    }
}

