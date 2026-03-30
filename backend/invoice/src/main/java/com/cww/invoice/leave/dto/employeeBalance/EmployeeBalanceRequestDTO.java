package com.cww.invoice.leave.dto.employeeBalance;


import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class EmployeeBalanceRequestDTO {

    @NotNull
    private UUID userId;

    @NotNull
    private UUID leaveTypeId;

    @NotNull
    private Integer policyYear;

    private Integer openingBalance;
    private Integer carryForwardDays;
    private Integer takenDays;
    private Integer lapsedDays;
}

