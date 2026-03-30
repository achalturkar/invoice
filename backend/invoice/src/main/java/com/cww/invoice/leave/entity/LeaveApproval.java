package com.cww.invoice.leave.entity;

import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import com.cww.invoice.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "leave_approvals",
        indexes = {
                @Index(name = "idx_approvals_leave_request_level",
                        columnList = "leave_request_id, approval_level"),
                @Index(name = "idx_approvals_approver_status",
                        columnList = "approver_id, status")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveApproval {

    @Id
    @GeneratedValue
    private UUID id;

    // Leave Request Reference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leave_request_id", nullable = false)
    private LeaveRequest leaveRequest;

    // Approval (Manager / HR)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver_id", nullable = false)
    private Employee approver;

    @Column(name = "approval_level", nullable = false)
    private Integer approvalLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeaveStatus status;

    private LocalDateTime assignedAt;
    private LocalDateTime dueAt;
    @Builder.Default
    private Boolean overrideApproval = false;
    @Builder.Default
    private Boolean overrideUsed = false;

    @Builder.Default
    private Double approvedDays = 0.0;

    private String comments;

    private LocalDateTime approvedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

