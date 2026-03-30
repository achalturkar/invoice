package com.cww.invoice.leave.service;

import com.cww.invoice.leave.dto.holidays.CreateHolidayRequest;
import com.cww.invoice.leave.dto.holidays.HolidayResponseDTO;
import com.cww.invoice.leave.entity.Holiday;

import java.util.List;
import java.util.UUID;

public interface HolidayService {

    HolidayResponseDTO createHoliday(UUID companyId, UUID userId, CreateHolidayRequest request);

    List<HolidayResponseDTO> getCompanyHolidays(UUID companyId);

    void deleteHoliday(UUID companyId, UUID holidayId);

    void toggleHolidayStatus(UUID companyId, UUID holidayId);

    List<HolidayResponseDTO> getHolidaysByYear(UUID companyId, int year);

    List<HolidayResponseDTO> getUpcomingHolidays(UUID companyId);
}

