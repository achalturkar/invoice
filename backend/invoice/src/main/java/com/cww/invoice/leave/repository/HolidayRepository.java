package com.cww.invoice.leave.repository;

import com.cww.invoice.leave.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface HolidayRepository extends JpaRepository<Holiday, UUID> {

    List<Holiday> findByCompanyIdAndIsActiveTrue(UUID companyId);

    List<Holiday> findByCompanyIdAndHolidayDateBetweenAndIsActiveTrue(
            UUID companyId,
            LocalDate start,
            LocalDate end
    );

    Optional<Holiday> findByIdAndCompanyId(UUID id, UUID companyId);

    boolean existsByCompany_IdAndHolidayDate(UUID companyId, LocalDate date);

    List<Holiday> findByCompany_IdAndHolidayDateBetween(
            UUID companyId,
            LocalDate start,
            LocalDate end
    );

    // 🔥 FINAL FIXED METHOD
    List<Holiday> findTop2ByCompany_IdAndHolidayDateGreaterThanEqualAndIsActiveTrueOrderByHolidayDateAsc(
            UUID companyId,
            LocalDate today
    );
}
