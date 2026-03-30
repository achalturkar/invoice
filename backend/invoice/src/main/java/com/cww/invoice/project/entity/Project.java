//package com.cww.invoice.project.entity;
//
//
//import com.cww.invoice.employeeproject.entity.EmployeeProject;
//import com.cww.invoice.common.entity.BaseEntity;
//import com.cww.invoice.company.entity.Company;
//import com.cww.invoice.project.entity.enums.ProjectStatus;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//
//@Entity
//@Table(name = "projects")
//@Getter
//@Setter
//public class Project extends BaseEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//
//    @Column(nullable = false)
//    private String name;
//
//    private String code; // optional project code
//
//    @Column(length = 1000)
//    private String description;
//
//    private LocalDate startDate;
//    private LocalDate endDate;
//
//    private BigDecimal budget;
//
//    @Enumerated(EnumType.STRING)
//    private ProjectStatus status;
//
//    /* 🔗 COMPANY */
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "company_id", nullable = false)
//    private Company company;
//
//
//    @OneToMany(
//            mappedBy = "project",
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    private List<EmployeeProject> Employee = new ArrayList<>();
//
//}
//
