package com.cww.invoice.client.entity;

import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
@Entity
@Table(name = "clients")
@Getter
@Setter
public class Client extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Basic Info
    private String clientName;
    private String email;
    private String phone;

    // Tax Info
    private String gstNo;
    private String panNo;

    // Address
    @Column(columnDefinition = "TEXT")
    private String billingAddress;

    @Column(columnDefinition = "TEXT")
    private String shippingAddress;

    // GST State
    private int stateCode;
    private String stateName;

    // Relation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
