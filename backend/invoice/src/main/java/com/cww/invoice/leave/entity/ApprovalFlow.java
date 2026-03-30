package com.cww.invoice.leave.entity;

import com.cww.invoice.company.entity.Company;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "approval_flows",
        uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {"company_id","module","active"}
        )
}
)
@Data
public class ApprovalFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    private String module;

    private String name;

    private Boolean active;

    private LocalDateTime createdAt;

}

