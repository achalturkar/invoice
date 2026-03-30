package com.cww.invoice.employee.dto;

import com.cww.invoice.employee.entity.enums.*;
import lombok.*;

import java.util.UUID;

@Data
public class EmployeeDocumentDto {
    private UUID id;
    private DocumentType documentType;
    private String documentUrl;
    private VerificationStatus verificationStatus;
    private String remarks;
}
