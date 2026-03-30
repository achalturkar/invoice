package com.cww.invoice.leave.service;

import com.cww.invoice.leave.dto.leaveApproval.LeaveApprovalRequestDTO;
import com.cww.invoice.leave.dto.leaveApproval.LeaveApprovalResponseDTO;
import com.cww.invoice.leave.entity.LeaveRequest;

import java.util.List;
import java.util.UUID;
public interface LeaveApprovalService {

    LeaveApprovalResponseDTO approveLeave(
            UUID companyId,
            UUID leaveRequestId,
            UUID approverId,
            LeaveApprovalRequestDTO request);

    LeaveApprovalResponseDTO rejectLeave(
            UUID companyId,
            UUID leaveRequestId,
            UUID approverId,
            LeaveApprovalRequestDTO request);

    List<LeaveApprovalResponseDTO> getPendingApprovals(
            UUID companyId,
            UUID approverId);

    List<LeaveApprovalResponseDTO> getApproverHistory(
            UUID companyId,
            UUID approverId);

    List<LeaveApprovalResponseDTO> getApprovalHistory(
            UUID companyId,
            UUID leaveRequestId);

    LeaveRequest getLeaveRequestDetails(
            UUID companyId,
            UUID leaveRequestId);
}
