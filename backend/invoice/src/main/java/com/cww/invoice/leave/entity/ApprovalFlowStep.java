package com.cww.invoice.leave.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "approval_flow_steps",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"flow_id", "level_number"}
                )
        }
)
@Data
public class ApprovalFlowStep {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flow_id")
    private ApprovalFlow flow;

    private Integer levelNumber;

    // MANAGER / TEAM_LEAD / HR / USER
    private String approverType;

    // optional role check
    private String role;

    // if specific user needed
    private UUID userId;

    private LocalDateTime createdAt;
}

