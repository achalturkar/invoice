package com.cww.invoice.invoiceDesk.service;


import com.cww.invoice.invoice.dto.FileResponse;
import com.cww.invoice.invoiceDesk.dto.InvoiceDeskCreateRequestDTO;
import com.cww.invoice.invoiceDesk.dto.InvoiceDeskResponseDTO;
import com.cww.invoice.invoiceDesk.entity.InvoiceDesk;
import com.cww.invoice.invoiceDesk.enums.InvoiceStatus;

import java.util.List;
import java.util.UUID;

public interface InvoiceDeskService {

    InvoiceDeskResponseDTO createDraftInvoice(
            UUID companyId,
            InvoiceDeskCreateRequestDTO dto
    );

    InvoiceDeskResponseDTO updateDraftInvoice(UUID companyId, UUID id, InvoiceDeskCreateRequestDTO dto);

    InvoiceDeskResponseDTO finalizeInvoice(UUID invoiceId);


     InvoiceDeskResponseDTO getInvoice(UUID invoiceId);

     List<InvoiceDeskResponseDTO> getAllInvoice(UUID companyId);

    List<InvoiceDeskResponseDTO> getInvoices(UUID companyId, InvoiceStatus status);

    void deleteInvoiceDeskById(UUID companyId, UUID invoiceId);

    FileResponse getInvoiceFile(UUID companyId, UUID invoiceId);


}
