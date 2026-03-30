package com.cww.invoice.leave.repository;

import com.cww.invoice.leave.entity.LeaveRequest;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface LeaveRequestRepository
        extends JpaRepository<LeaveRequest, UUID> {

    Page<LeaveRequest> findByEmployee_Id(
            UUID employeeId,
            Pageable pageable
    );

    List<LeaveRequest> findByEmployee_Id(UUID employeeId);

    List<LeaveRequest> findByEmployee_IdAndStatus(
            UUID employeeId,
            LeaveStatus status
    );

    List<LeaveRequest> findByEmployee_Manager_IdAndStatus(
            UUID managerId,
            LeaveStatus status
    );


    List<LeaveRequest> findByEmployee_Company_Id(UUID companyId);


    // Recent 5 leave requests
    List<LeaveRequest> findTop5ByEmployee_IdOrderByCreatedAtDesc(
            UUID employeeId
    );

    // Recent 5 company requests
    List<LeaveRequest> findTop5ByEmployee_Company_IdOrderByCreatedAtDesc(
            UUID companyId
    );

    boolean existsByEmployee_IdAndFromDateLessThanEqualAndToDateGreaterThanEqual(
            UUID employeeId,
            LocalDate toDate,
            LocalDate fromDate
    );
}
