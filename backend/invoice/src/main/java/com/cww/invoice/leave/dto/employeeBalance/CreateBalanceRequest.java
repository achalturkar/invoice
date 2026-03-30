package com.cww.invoice.leave.dto.employeeBalance;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateBalanceRequest {

    private UUID leaveTypeId;
    private Integer year;
//    private Integer openingBalance;
}

