package com.cww.invoice.leave.controller;

import com.cww.invoice.leave.dto.employeeBalance.CreateBalanceRequest;
import com.cww.invoice.leave.dto.leaveRequest.DeductLeaveRequest;
import com.cww.invoice.leave.dto.employeeBalance.EmployeeBalanceResponseDTO;
import com.cww.invoice.leave.dto.employeeBalance.UpdateBalanceRequest;
import com.cww.invoice.leave.service.EmployeeBalanceService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies/{companyId}/users/{employeeId}/leave-balances")
@AllArgsConstructor
public class EmployeeBalanceController {

    private final EmployeeBalanceService service;

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN','HR')")
    @PostMapping
    public ResponseEntity<EmployeeBalanceResponseDTO> create(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @RequestBody CreateBalanceRequest request) {

        return ResponseEntity.ok(
                service.createBalance(
                        companyId,
                        employeeId,
                        request.getLeaveTypeId(),
                        request.getYear()
                )
        );
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN','HR','EMPLOYEE')")
    @GetMapping("/{year}")
    public ResponseEntity<List<EmployeeBalanceResponseDTO>> getAll(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @PathVariable Integer year) {

        return ResponseEntity.ok(
                service.getAllByUser(companyId, employeeId, year)
        );
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN','HR','EMPLOYEE')")
    @GetMapping("/{leaveTypeId}/{year}")
    public ResponseEntity<EmployeeBalanceResponseDTO> get(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @PathVariable UUID leaveTypeId,
            @PathVariable Integer year) {

        return ResponseEntity.ok(
                service.getBalance(companyId, employeeId, leaveTypeId, year)
        );
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN','HR')")
    @PostMapping("/{leaveTypeId}/deduct")
    public ResponseEntity<EmployeeBalanceResponseDTO> deduct(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @PathVariable UUID leaveTypeId,
            @RequestBody DeductLeaveRequest request) {

        return ResponseEntity.ok(
                service.deductLeave(
                        companyId,
                        employeeId,
                        leaveTypeId,
                        request.getYear(),
                        request.getDays()
                )
        );
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN','HR')")
    @PostMapping("/{leaveTypeId}/restore")
    public ResponseEntity<Void> restore(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @PathVariable UUID leaveTypeId,
            @RequestBody DeductLeaveRequest request) {

        service.restoreLeave(
                companyId,
                employeeId,
                leaveTypeId,
                request.getYear(),
                request.getDays()
        );

        return ResponseEntity.ok().build();
    }


    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN','HR')")
    @PutMapping("/{balanceId}")
    public ResponseEntity<EmployeeBalanceResponseDTO> update(
            @PathVariable UUID companyId,
            @PathVariable UUID balanceId,
            @RequestBody UpdateBalanceRequest request) {

        return ResponseEntity.ok(
                service.updateBalance(
                        companyId,
                        balanceId,
                        request.getOpeningBalance(),
                        request.getCarryForwardDays(),
                        request.getLapsedDays()
                )
        );
    }

    @PreAuthorize("hasAnyRole('SUPER_ADMIN','COMPANY_ADMIN')")
    @DeleteMapping("/{balanceId}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @PathVariable UUID balanceId) {

        service.deleteBalance(companyId, employeeId, balanceId);
        return ResponseEntity.noContent().build();
    }
}
