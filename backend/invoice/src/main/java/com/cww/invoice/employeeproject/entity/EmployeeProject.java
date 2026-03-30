//package com.cww.invoice.employeeproject.entity;
//
//import com.cww.invoice.employee.entity.Employee;
//import com.cww.invoice.employeeproject.entity.enums.AssignmentStatus;
//import com.cww.invoice.common.entity.BaseEntity;
//import com.cww.invoice.project.entity.Project;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.UUID;
//
//@Entity
//@Table(
//        name = "candidate_projects",
//        uniqueConstraints = {
//                @UniqueConstraint(columnNames = {"candidate_id", "project_id"})
//        }
//)
//@Getter
//@Setter
//public class EmployeeProject extends BaseEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    /* 🔗 Candidate */
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "candidate_id", nullable = false)
//    private Employee employee;
//
//    /* 🔗 Project */
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "project_id", nullable = false)
//    private Project project;
//
//    /* 🔥 BUSINESS FIELDS (VERY IMPORTANT) */
//    private LocalDate startDate;
//    private LocalDate endDate;
//
//    private BigDecimal billingRate;   // for invoices
//    private Integer allocationPercent; // 50%, 100%, etc
//
//    @Enumerated(EnumType.STRING)
//    private AssignmentStatus status; // ACTIVE / COMPLETED / REMOVED
//}
//
