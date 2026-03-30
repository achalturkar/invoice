package com.cww.invoice.leave.dto.employeeBalance;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class EmployeeBalanceResponseDTO {

    private UUID id;

    private UUID employeeId;

    private UUID leaveTypeId;

    private String leaveName;

    private String leaveCode;

    private Integer policyYear;

    private Integer openingBalance;

    private Integer carryForwardDays;

    private Integer takenDays;

    private Integer remainingDays;

    private Integer lapsedDays;

    private LocalDateTime lastUpdated;
}
