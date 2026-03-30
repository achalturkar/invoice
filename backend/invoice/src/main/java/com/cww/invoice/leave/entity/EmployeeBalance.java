package com.cww.invoice.leave.entity;

import com.cww.invoice.employee.entity.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(
        name = "employee_balances",
        uniqueConstraints = @UniqueConstraint(
                name = "unique_balance",
                columnNames = {"employee_id", "leave_type_id", "policy_year"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeBalance {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    /* ================= FIXED PART ================= */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leave_type_id", nullable = false)
    private LeaveType leaveType;

    /* ================================================= */

    @Column(name = "policy_year", nullable = false)
    private Integer policyYear;

    @Column(name = "opening_balance")
    private Integer openingBalance = 0;

    @Column(name = "carry_forward_days")
    private Integer carryForwardDays = 0;

    @Column(name = "total_days")
    private Integer totalDays = 0;

    @Column(name = "taken_days")
    private Integer takenDays = 0;

    @Column(name = "remaining_days")
    private Integer remainingDays = 0;

    @Column(name = "lapsed_days")
    private Integer lapsedDays = 0;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    public void calculateRemaining() {
        this.remainingDays =
                (openingBalance != null ? openingBalance : 0)
                        + (carryForwardDays != null ? carryForwardDays : 0)
                        - (takenDays != null ? takenDays : 0)
                        - (lapsedDays != null ? lapsedDays : 0);
    }

    public void calculateTotalDays() {
        this.totalDays = openingBalance + carryForwardDays;

    }
}
