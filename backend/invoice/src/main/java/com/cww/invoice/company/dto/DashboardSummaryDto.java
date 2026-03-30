package com.cww.invoice.company.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardSummaryDto {

    private long totalCandidates;
    private long totalClients;
    private long totalInvoice;
}

