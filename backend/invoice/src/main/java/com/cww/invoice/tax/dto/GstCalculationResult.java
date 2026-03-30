package com.cww.invoice.tax.dto;


import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class GstCalculationResult {

    private BigDecimal taxableAmount;

    private BigDecimal cgstAmount;
    private BigDecimal sgstAmount;
    private BigDecimal igstAmount;

    private BigDecimal totalTax;
    private BigDecimal grandTotal;
}

