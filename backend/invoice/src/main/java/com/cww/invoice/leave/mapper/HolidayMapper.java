package com.cww.invoice.leave.mapper;

import com.cww.invoice.leave.dto.holidays.HolidayResponseDTO;
import com.cww.invoice.leave.entity.Holiday;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class HolidayMapper {

    public static HolidayResponseDTO toDto(Holiday holiday) {

        HolidayResponseDTO dto = new HolidayResponseDTO();

        dto.setId(holiday.getId());
        dto.setHolidayDate(holiday.getHolidayDate());
        dto.setHolidayName(holiday.getHolidayName());
        dto.setDescription(holiday.getDescription());
        dto.setHolidayCategory(holiday.getHolidayCategory());
        dto.setIsMandatory(holiday.getIsMandatory());
        dto.setIsActive(holiday.getIsActive());

        // 🔥 Derived fields
        dto.setDay(holiday.getHolidayDate().getDayOfWeek().toString());
        dto.setDaysLeft(
                ChronoUnit.DAYS.between(LocalDate.now(), holiday.getHolidayDate())
        );

        return dto;
    }
}
