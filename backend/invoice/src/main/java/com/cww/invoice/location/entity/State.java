package com.cww.invoice.location.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.ISBN;

import java.util.UUID;
@Entity
@Table(
        name = "states",
        uniqueConstraints = @UniqueConstraint(columnNames = {"state_name", "country_id"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "state_name", nullable = false)
    private String stateName;

    private String stateCode;     // MH, DL
    private String gstStateCode;  // 27, 07

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;
}
