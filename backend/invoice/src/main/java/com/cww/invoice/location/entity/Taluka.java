package com.cww.invoice.location.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "talukas",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"taluka_name", "district_id"})
        })
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class Taluka {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "taluka_name", nullable = false)
    private String talukaName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id", nullable = false)
    private District district;
}

