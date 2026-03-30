package com.cww.invoice.leave.service.impl;

import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.leave.dto.holidays.CreateHolidayRequest;
import com.cww.invoice.leave.dto.holidays.HolidayResponseDTO;

import com.cww.invoice.leave.entity.Holiday;
import com.cww.invoice.leave.mapper.HolidayMapper;
import com.cww.invoice.leave.repository.HolidayRepository;
import com.cww.invoice.leave.service.HolidayService;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class HolidayServiceImpl implements HolidayService {

    private final HolidayRepository holidayRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Override
    public HolidayResponseDTO createHoliday(UUID companyId, UUID userId, CreateHolidayRequest request) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 VALIDATION
        if (request.getHolidayDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot create past holiday");
        }

        if (holidayRepository.existsByCompany_IdAndHolidayDate(companyId, request.getHolidayDate())) {
            throw new RuntimeException("Holiday already exists on this date");
        }

        Holiday holiday = new Holiday();
        holiday.setCompany(company);
        holiday.setCreatedBy(user);
        holiday.setHolidayDate(request.getHolidayDate());
        holiday.setHolidayName(request.getHolidayName());
        holiday.setDescription(request.getDescription());
        holiday.setHolidayCategory(request.getHolidayCategory());
        holiday.setIsMandatory(
                request.getIsMandatory() != null ? request.getIsMandatory() : false
        );

        holidayRepository.save(holiday);

        return HolidayMapper.toDto(holiday);
    }

    @Override
    public List<HolidayResponseDTO> getCompanyHolidays(UUID companyId) {

        return holidayRepository.findByCompanyIdAndIsActiveTrue(companyId)
                .stream()
                .map(HolidayMapper::toDto)
                .toList();
    }

    @Override
    public void deleteHoliday(UUID companyId, UUID holidayId) {

        Holiday holiday = holidayRepository
                .findByIdAndCompanyId(holidayId, companyId)
                .orElseThrow(() -> new RuntimeException("Holiday not found"));

        // 🔥 SOFT DELETE (ENTERPRISE)
        holiday.setIsActive(false);
        holidayRepository.save(holiday);
    }

    @Override
    public void toggleHolidayStatus(UUID companyId, UUID holidayId) {

        Holiday holiday = holidayRepository
                .findByIdAndCompanyId(holidayId, companyId)
                .orElseThrow(() -> new RuntimeException("Holiday not found"));

        holiday.setIsActive(!holiday.getIsActive());
        holidayRepository.save(holiday);
    }

    @Override
    public List<HolidayResponseDTO> getHolidaysByYear(UUID companyId, int year) {

        LocalDate start = LocalDate.of(year, 1, 1);
        LocalDate end = LocalDate.of(year, 12, 31);

        return holidayRepository
                .findByCompanyIdAndHolidayDateBetweenAndIsActiveTrue(companyId, start, end)
                .stream()
                .map(HolidayMapper::toDto)
                .toList();
    }

    // 🔥 ENTERPRISE LEAVE CALCULATION
    public int calculateLeaveDays(UUID companyId, LocalDate startDate, LocalDate endDate) {

        List<Holiday> holidays =
                holidayRepository.findByCompany_IdAndHolidayDateBetween(companyId, startDate, endDate);

        Set<LocalDate> holidayDates =
                holidays.stream().map(Holiday::getHolidayDate).collect(Collectors.toSet());

        int leaveDays = 0;

        LocalDate date = startDate;

        while (!date.isAfter(endDate)) {

            DayOfWeek day = date.getDayOfWeek();

            boolean isWeekend =
                    day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;

            boolean isHoliday = holidayDates.contains(date);

            if (!isWeekend && !isHoliday) {
                leaveDays++;
            }

            date = date.plusDays(1);
        }

        return leaveDays;
    }

    // 🔥 FINAL UPCOMING HOLIDAY
    @Override
    public List<HolidayResponseDTO> getUpcomingHolidays(UUID companyId) {

        return holidayRepository
                .findTop2ByCompany_IdAndHolidayDateGreaterThanEqualAndIsActiveTrueOrderByHolidayDateAsc(
                        companyId,
                        LocalDate.now()
                )
                .stream()
                .map(HolidayMapper::toDto)
                .toList();
    }
}
