package com.cww.invoice.leave.entity;

import com.cww.invoice.company.entity.Company;
import com.cww.invoice.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "leave_policies",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_company_leave_year",
                        columnNames = {"company_id", "leave_type_id", "policy_year"}
                )
        })
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LeavePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leave_type_id", nullable = false)
    private LeaveType leaveType;

    @Column(name = "policy_year", nullable = false)
    private Integer policyYear;

    @Column(name = "total_entitlement_days", nullable = false)
    private Integer totalEntitlementDays;

    @Column(name = "notice_period_days")
    private Integer noticePeriodDays = 0;

    @Column(name = "min_approval_level")
    private Integer minApprovalLevel = 1;

    @Column(name = "rule")
    private String rules;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(name = "effective_to")
    private LocalDate effectiveTo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

