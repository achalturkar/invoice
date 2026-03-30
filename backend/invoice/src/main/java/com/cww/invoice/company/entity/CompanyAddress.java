package com.cww.invoice.company.entity;

import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.location.entity.Country;
import com.cww.invoice.location.entity.District;
import com.cww.invoice.location.entity.State;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "company_addresses")
@Getter
@Setter
public class CompanyAddress extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String addressLine1;
    private String addressLine2;

    private String city;
    private String district;
    private String pincode;

    @ManyToOne(fetch = FetchType.LAZY)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    private Country country;

    private Boolean isPrimary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
