package com.cww.invoice.leave.entity;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "holidays",
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_company_holiday_date",
                        columnNames = {"company_id", "holiday_date"})
        },
        indexes = {
                @Index(name = "idx_holidays_date", columnList = "holiday_date")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "holiday_date", nullable = false)
    private LocalDate holidayDate;

    @Column(name = "holiday_name", nullable = false, length = 255)
    private String holidayName;

//    @Column(name = "day", nullable = false, length = 255)
//    private String day;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "holiday_category", length = 50)
    private String holidayCategory;
    // NATIONAL / REGIONAL / COMPANY

    @Column(name = "is_mandatory", nullable = false)
    private Boolean isMandatory = false;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}