package com.cww.invoice.candidateproject.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class CandidateProjectRequestDto {

    private UUID candidateId;
    private UUID projectId;

    private LocalDate startDate;
    private BigDecimal billingRate;
    private Integer allocationPercent;
}

