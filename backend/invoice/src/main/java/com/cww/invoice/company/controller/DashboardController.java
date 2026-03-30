package com.cww.invoice.company.controller;

import com.cww.invoice.company.dto.DashboardSummaryDto;
import com.cww.invoice.company.service.DashboardSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RestController
@RequestMapping("/api/companies/{companyId}/dashboard")
@RequiredArgsConstructor
public class DashboardController {

private final DashboardSummaryService dashboardSummaryService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary(
            @PathVariable UUID companyId
    ) {
        return ResponseEntity.ok(
                dashboardSummaryService.getSummary(companyId)
        );
    }
}

