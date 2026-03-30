package com.cww.invoice.leave.dto.leaveRequest;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class CreateLeaveRequestDTO {

    private UUID leaveTypeId;
    private LocalDate fromDate;
    private LocalDate toDate;
    private Boolean halfDay;
    private String reason;
    private String filePath;
    private Long contact;
}

