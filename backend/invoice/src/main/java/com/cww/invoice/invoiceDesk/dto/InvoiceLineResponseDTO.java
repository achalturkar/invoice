package com.cww.invoice.invoiceDesk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceLineResponseDTO {
    private String resourceName;

    private Integer sac;
    private LocalDate periodFrom;
    private LocalDate periodTo;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineAmount;

    private List<LineTaxDTO> taxes;

}
