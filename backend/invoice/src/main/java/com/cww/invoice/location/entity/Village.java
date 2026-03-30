package com.cww.invoice.location.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "villages",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"village_name", "taluka_id"})
        })
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class Village {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "village_name", nullable = false)
    private String villageName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taluka_id", nullable = false)
    private Taluka taluka;
}
