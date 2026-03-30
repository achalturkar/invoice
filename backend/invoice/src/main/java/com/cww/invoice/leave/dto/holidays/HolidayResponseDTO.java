package com.cww.invoice.leave.dto.holidays;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class HolidayResponseDTO {

    private UUID id;
    private LocalDate holidayDate;
    private String holidayName;
    private String description;
    private String holidayCategory;
    private Boolean isMandatory;
    private Boolean isActive;

    // 🔥 Enterprise UI fields
    private String day;
    private long daysLeft;
}


