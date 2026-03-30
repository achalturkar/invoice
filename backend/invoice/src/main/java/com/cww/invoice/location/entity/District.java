package com.cww.invoice.location.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "districts",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"district_name", "state_id"})
        })
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "district_name", nullable = false)
    private String districtName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id", nullable = false)
    private State state;
}
