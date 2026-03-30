package com.cww.invoice.leave.controller;

import com.cww.invoice.leave.dto.leaveApproval.LeaveApprovalRequestDTO;
import com.cww.invoice.leave.dto.leaveApproval.LeaveApprovalResponseDTO;
import com.cww.invoice.leave.entity.LeaveRequest;
import com.cww.invoice.leave.service.LeaveApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies/{companyId}/leave-approvals")
@RequiredArgsConstructor
public class LeaveApprovalController {

    private final LeaveApprovalService approvalService;

    // APPROVE
    @PostMapping("/{leaveRequestId}/approve/{approverId}")
    public LeaveApprovalResponseDTO approveLeave(
            @PathVariable UUID companyId,
            @PathVariable UUID leaveRequestId,
            @PathVariable UUID approverId,
            @RequestBody LeaveApprovalRequestDTO request){

        return approvalService.approveLeave(
                companyId,
                leaveRequestId,
                approverId,
                request
        );
    }

    // REJECT
    @PostMapping("/{leaveRequestId}/reject/{approverId}")
    public LeaveApprovalResponseDTO rejectLeave(
            @PathVariable UUID companyId,
            @PathVariable UUID leaveRequestId,
            @PathVariable UUID approverId,
            @RequestBody LeaveApprovalRequestDTO request){

        return approvalService.rejectLeave(
                companyId,
                leaveRequestId,
                approverId,
                request
        );
    }

    // PENDING REQUESTS FOR APPROVER
    @GetMapping("/pending/{approverId}")
    public List<LeaveApprovalResponseDTO> pendingApprovals(
            @PathVariable UUID companyId,
            @PathVariable UUID approverId){

        return approvalService.getPendingApprovals(companyId, approverId);
    }

    // HISTORY OF APPROVER ACTIONS
    @GetMapping("/my-history/{approverId}")
    public List<LeaveApprovalResponseDTO> myApprovalHistory(
            @PathVariable UUID companyId,
            @PathVariable UUID approverId){

        return approvalService.getApproverHistory(companyId, approverId);
    }

    // APPROVAL TIMELINE OF A REQUEST
    @GetMapping("/history/{leaveRequestId}")
    public List<LeaveApprovalResponseDTO> approvalHistory(
            @PathVariable UUID companyId,
            @PathVariable UUID leaveRequestId){

        return approvalService.getApprovalHistory(companyId, leaveRequestId);
    }

    // FULL LEAVE DETAILS BEFORE APPROVAL
    @GetMapping("/request/{leaveRequestId}")
    public LeaveRequest getLeaveRequestDetails(
            @PathVariable UUID companyId,
            @PathVariable UUID leaveRequestId){

        return approvalService.getLeaveRequestDetails(companyId, leaveRequestId);
    }
}
