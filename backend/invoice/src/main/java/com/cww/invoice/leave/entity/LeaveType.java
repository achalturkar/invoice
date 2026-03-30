package com.cww.invoice.leave.entity;


import com.cww.invoice.company.entity.Company;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(
        name = "leave_types",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_company_leave_code",
                        columnNames = {"company_id", "code"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(nullable = false, length = 20)
    private String code;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "max_days_per_year", nullable = false)
    private Integer maxDaysPerYear = 0;

    @Column(name = "carry_forward_days", nullable = false)
    private Integer carryForwardDays = 0;

    @Column(name = "requires_approval", nullable = false)
    private Boolean requiresApproval = true;

    @Column(name = "impacts_payroll", nullable = false)
    private Boolean impactsPayroll = false;

    @Column(name = "half_day_allowed", nullable = false)
    private Boolean halfDayAllowed = true;

    @Column(name = "negative_balance_allowed", nullable = false)
    private Boolean negativeBalanceAllowed = false;

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = false;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
