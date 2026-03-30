package com.cww.invoice.leave.controller;

import com.cww.invoice.leave.dto.holidays.CreateHolidayRequest;
import com.cww.invoice.leave.dto.holidays.HolidayResponseDTO;
import com.cww.invoice.leave.mapper.HolidayMapper;
import com.cww.invoice.leave.service.HolidayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/companies/{companyId}/holidays")
@RequiredArgsConstructor
public class HolidayController {

    private final HolidayService holidayService;

    @PostMapping
    public ResponseEntity<HolidayResponseDTO> create(
            @PathVariable UUID companyId,
            @RequestParam UUID userId,
            @RequestBody CreateHolidayRequest request
    ) {
        return ResponseEntity.ok(
                holidayService.createHoliday(companyId, userId, request)
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<HolidayResponseDTO>> getAll(
            @PathVariable UUID companyId
    ) {
        return ResponseEntity.ok(
                holidayService.getCompanyHolidays(companyId)
        );
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<HolidayResponseDTO>> getUpcoming(
            @PathVariable UUID companyId) {

        return ResponseEntity.ok(
                holidayService.getUpcomingHolidays(companyId)
        );
    }

    @DeleteMapping("/{holidayId}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID companyId,
            @PathVariable UUID holidayId
    ) {
        holidayService.deleteHoliday(companyId, holidayId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{holidayId}/toggle")
    public ResponseEntity<Void> toggle(
            @PathVariable UUID companyId,
            @PathVariable UUID holidayId
    ) {
        holidayService.toggleHolidayStatus(companyId, holidayId);
        return ResponseEntity.ok().build();
    }

    // 🔥 FIXED
    @GetMapping("/year/{year}")
    public ResponseEntity<List<HolidayResponseDTO>> getByYear(
            @PathVariable UUID companyId,
            @PathVariable int year
    ) {
        return ResponseEntity.ok(
                holidayService.getHolidaysByYear(companyId, year)
        );
    }
}
