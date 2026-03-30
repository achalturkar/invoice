package com.cww.invoice.leave.dto.employeeBalance;

import lombok.Data;

@Data
public class UpdateBalanceRequest {

    private Integer openingBalance;
    private Integer carryForwardDays;
    private Integer lapsedDays;
}

