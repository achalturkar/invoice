package com.cww.invoice.leave.mapper;

import com.cww.invoice.leave.dto.leaveApproval.ApprovalDTO;
import com.cww.invoice.leave.dto.leaveRequest.LeaveRequestResponseDTO;
import com.cww.invoice.leave.entity.LeaveRequest;

import java.util.Collections;
import java.util.Optional;
public class LeaveRequestMapper {

    public static LeaveRequestResponseDTO toDTO(LeaveRequest e) {

        return LeaveRequestResponseDTO.builder()
                .id(e.getId())
                .employeeId(e.getEmployee().getId())
                .employeeName(e.getEmployee().getFullName())
                .leaveTypeId(e.getLeaveType().getId())
                .leaveTypeName(e.getLeaveType().getName())
                .leaveTypeCode(e.getLeaveType().getCode())
                .fromDate(e.getFromDate())
                .toDate(e.getToDate())
                .totalDays(e.getTotalDays())
                .halfDay(e.getHalfDay())
                .reason(e.getReason())
                .contact(e.getContact())
                .filePath(e.getFilePath())
                .status(e.getStatus())
                .approvalLevelCurrent(e.getApprovalLevelCurrent())
                .approvalLevelMax(e.getApprovalLevelMax())
                .approvedDays(e.getApprovedDays())
                .finalApprovedBy(e.getFinalApprovedBy())
                .overrideUsed(e.getOverrideUsed())

                .createdAt(e.getCreatedAt())
                .submittedAt(e.getSubmittedAt())

                // ✅ FIXED APPROVAL MAPPING
                .approvals(
                        Optional.ofNullable(e.getApprovals())
                                .orElse(Collections.emptyList())
                                .stream()
                                .map(a -> ApprovalDTO.builder()
                                        .approverName(
                                                a.getApprover() != null
                                                        ? a.getApprover().getFullName()
                                                        : null
                                        )
                                        .role(
                                                a.getApprover() != null &&
                                                        a.getApprover().getUser() != null &&
                                                        a.getApprover().getUser().getRole() != null
                                                        ? a.getApprover().getUser().getRole()
                                                        : null
                                        )

                                        .level(a.getApprovalLevel())
                                        .status(a.getStatus().name())
                                        .comment(a.getComments())
                                        .actionDate(a.getApprovedAt())
                                        .build()
                                )
                                .toList()
                )
                .build();
    }
}

//    public static LeaveRequestResponseDTO toDetailedDTO(LeaveRequest request) {
//
//        return LeaveRequestResponseDTO.builder()
//                .id(request.getId())
//                .employeeName(request.getEmployee().getFullName())
//                .leaveType(request.getLeaveType().getName())
//                .fromDate(request.getFromDate())
//                .toDate(request.getToDate())
//                .totalDays(request.getTotalDays())
//                .halfDay(request.getHalfDay())
//                .reason(request.getReason())
//                .contact(request.getContact())
//                .filePath(request.getFilePath())
//                .status(request.getStatus().name())
//                .currentLevel(request.getApprovalLevelCurrent())
//
//                .approvals(
//                        request.getApprovals().stream()
//                                .map(a -> ApprovalDTO.builder()
//                                        .approverName(a.getApprover().getName())
//                                        .role(a.getRole().name())
//                                        .status(a.getStatus().name())
//                                        .comment(a.getComment())
//                                        .actionDate(a.getActionDate())
//                                        .build()
//                                )
//                                .toList()
//                )
//                .build();
//    }

