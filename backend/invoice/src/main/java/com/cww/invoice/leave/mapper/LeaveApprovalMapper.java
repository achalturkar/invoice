package com.cww.invoice.leave.mapper;

import com.cww.invoice.leave.dto.leaveApproval.LeaveApprovalResponseDTO;
import com.cww.invoice.leave.entity.LeaveApproval;
import com.cww.invoice.leave.entity.LeaveRequest;
import com.cww.invoice.leave.entity.enums.LeaveStatus;

import java.time.temporal.ChronoUnit;

public class LeaveApprovalMapper {

    public static LeaveApprovalResponseDTO toDTO(LeaveApproval entity){

        LeaveRequest request = entity.getLeaveRequest();

        int days = (int) ChronoUnit.DAYS.between(
                request.getFromDate(),
                request.getToDate()
        ) + 1;

        Double approvedDays = request.getApprovedDays() != null
                ? request.getApprovedDays()
                : request.getTotalDays();

        return LeaveApprovalResponseDTO.builder()
                .id(entity.getId())
                .leaveRequestId(request.getId())
                .approverId(entity.getApprover().getId())
                .approvalLevel(entity.getApprovalLevel())
                .status(entity.getStatus().name())
                .comments(entity.getComments())
                .approvedAt(entity.getApprovedAt())
                .approvedDays(entity.getLeaveRequest().getApprovedDays())
                .isCurrentLevel(
                        entity.getApprovalLevel().equals(
                                request.getApprovalLevelCurrent()
                        )
                )
                .canApprove(
                        entity.getStatus() == LeaveStatus.PENDING
                )


                // EMPLOYEE
                .employeeId(request.getEmployee().getId())
                .employeeName(request.getEmployee().getFullName())

                // LEAVE
                .leaveType(request.getLeaveType().getName())
                .fromDate(request.getFromDate())
                .toDate(request.getToDate())
                .days(request.getApprovedDays() != null
                        ? request.getApprovedDays().intValue()
                        : days)
                .reason(request.getReason())



                .build();
    }
}
