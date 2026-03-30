package com.cww.invoice.leave.dto.holidays;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateHolidayRequest {
    private LocalDate holidayDate;
    private String holidayName;
    private String description;
    private String holidayCategory;
    private Boolean isMandatory;
}

