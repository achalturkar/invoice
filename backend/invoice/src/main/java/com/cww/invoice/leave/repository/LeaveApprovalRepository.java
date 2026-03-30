package com.cww.invoice.leave.repository;

import com.cww.invoice.leave.entity.LeaveApproval;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LeaveApprovalRepository extends JpaRepository<LeaveApproval, UUID> {

    List<LeaveApproval> findByApprover_IdAndStatus(UUID approverId, LeaveStatus status);

    List<LeaveApproval> findByLeaveRequest_Id(UUID leaveRequestId);

    List<LeaveApproval> findByApprover_Id(UUID approverId);

    List<LeaveApproval> findByStatus(LeaveStatus status);


}