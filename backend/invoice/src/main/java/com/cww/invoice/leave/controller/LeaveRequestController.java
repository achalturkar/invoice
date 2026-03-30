package com.cww.invoice.leave.controller;

import com.cww.invoice.common.service.FileStorageService;
import com.cww.invoice.leave.dto.leaveRequest.CreateLeaveRequestDTO;
import com.cww.invoice.leave.dto.leaveRequest.LeaveApprovalDTO;
import com.cww.invoice.leave.dto.leaveRequest.LeaveRequestResponseDTO;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import com.cww.invoice.leave.service.impl.LeaveRequestService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies/{companyId}/leave-requests")
@AllArgsConstructor
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    @PostMapping("/employees/{employeeId}")
    public ResponseEntity<LeaveRequestResponseDTO> apply(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @RequestBody CreateLeaveRequestDTO dto) {

        return ResponseEntity.ok(
                leaveRequestService.applyLeave(companyId, employeeId, dto)
        );
    }






    // GET Employee Leaves
    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<List<LeaveRequestResponseDTO>> getEmployeeLeaves(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @RequestParam(required = false) LeaveStatus status) {

        return ResponseEntity.ok(
                leaveRequestService
                        .getEmployeeLeaves(companyId, employeeId, status)
        );
    }

    @GetMapping("/employees/{employeeId}/request/{leaveRequestId}")
    public ResponseEntity<LeaveRequestResponseDTO> getLeaveById(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @PathVariable UUID leaveRequestId) {

        return ResponseEntity.ok(
                leaveRequestService.getLeaveById(companyId, employeeId, leaveRequestId)
        );
    }


    @GetMapping("/employees/{employeeId}/recent")
    public ResponseEntity<List<LeaveRequestResponseDTO>> getEmployeeLeaves(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId) {

        return ResponseEntity.ok(
                leaveRequestService
                        .getRecentLeaves(companyId, employeeId)
        );
    }




    // APPROVE
//    @PostMapping("/{requestId}/approve")
//    public ResponseEntity<LeaveRequestResponseDTO> approve(
//            @PathVariable UUID companyId,
//            @PathVariable UUID requestId,
//            @RequestBody LeaveApprovalDTO dto) {
//
//        return ResponseEntity.ok(
//                leaveRequestService.approveLeave(companyId, requestId, dto)
//        );
//    }

    // Get Pending For Approver
//    @GetMapping("/approver/{approverId}/pending")
//    public ResponseEntity<List<LeaveRequestResponseDTO>> getPending(
//            @PathVariable UUID companyId,
//            @PathVariable UUID approverId) {
//
//        return ResponseEntity.ok(
//                leaveRequestService
//                        .getPendingForApprover(companyId, approverId)
//        );
//    }

    // Approve / Reject
//    @PostMapping("/{requestId}/decision")
//    public ResponseEntity<LeaveRequestResponseDTO> decision(
//            @PathVariable UUID companyId,
//            @PathVariable UUID requestId,
//            @RequestBody LeaveApprovalDTO dto) {
//
//        return ResponseEntity.ok(
//                leaveRequestService
//                        .decision(companyId, requestId, dto)
//        );
//    }

    // Cancel
    @PostMapping("/{requestId}/cancel")
    public ResponseEntity<LeaveRequestResponseDTO> cancel(
            @PathVariable UUID companyId,
            @PathVariable UUID requestId) {

        return ResponseEntity.ok(
                leaveRequestService
                        .cancelLeave(companyId, requestId)
        );
    }

    // Filter
    @GetMapping("/filter")
    public ResponseEntity<List<LeaveRequestResponseDTO>> filter(
            @PathVariable UUID companyId,
            @RequestParam(required = false) UUID userId,
            @RequestParam(required = false) LeaveStatus status,
            @RequestParam(required = false) LocalDate fromDate,
            @RequestParam(required = false) LocalDate toDate) {

        return ResponseEntity.ok(
                leaveRequestService
                        .filterLeaves(companyId,
                                userId,
                                status,
                                fromDate,
                                toDate)
        );
    }


    // GET BY EMPLOYEE + STATUS
//    @GetMapping("/employees/{employeeId}")
//    public List<LeaveRequestResponseDTO> getByEmployee(
//            @PathVariable UUID companyId,
//            @PathVariable UUID employeeId,
//            @RequestParam LeaveStatus status) {
//
//        return leaveRequestService.getByEmployee(companyId, employeeId, status);
//    }
}

