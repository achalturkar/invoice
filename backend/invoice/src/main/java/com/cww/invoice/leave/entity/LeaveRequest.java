package com.cww.invoice.leave.entity;

import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.leave.entity.enums.LeaveStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "leave_requests",
        indexes = {
                @Index(name = "idx_leave_employee_status",
                        columnList = "employee_id,status"),
                @Index(name = "idx_leave_dates",
                        columnList = "from_date,to_date")
        })
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // 🔹 Employee
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    // 🔹 Leave Type
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leave_type_id", nullable = false)
    private LeaveType leaveType;

    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @Column(nullable = false)
    private Double totalDays;

    private Double approvedDays;
    private UUID finalApprovedBy;
    private Boolean overrideUsed;


    @Builder.Default
    private Boolean halfDay = false;

    @Column(nullable = false, length = 500)
    private String reason;

    private String filePath;

    private Long contact;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private LeaveStatus status = LeaveStatus.PENDING;

    // approval flow
    private Integer approvalLevelCurrent;

    private Integer approvalLevelMax;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime submittedAt;

    @OneToMany(mappedBy = "leaveRequest", cascade = CascadeType.ALL)
    private List<LeaveApproval> approvals;


}
