package com.cww.invoice.location.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
@Entity
@Table(name = "pincodes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"pincode"})
})
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class Pincode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 6, nullable = false)
    private String pincode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "village_id", nullable = false)
    private Village village;
}

