package com.cww.invoice.client.entity;

import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.invoice.entity.Invoice;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;
//@Entity
//@Table(name = "clients")
//@Getter
//@Setter
//public class Client extends BaseEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    // Basic Info
//    private String clientName;
//    private String email;
//    private String phone;
//
//    // Tax Info
//    private String gstNo;
//    private String panNo;
//
//    // Address
//    @Column(columnDefinition = "TEXT")
//    private String billingAddress;
//
//    @Column(columnDefinition = "TEXT")
//    private String shippingAddress;
//
//    @OneToMany(
//            mappedBy = "client",
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    private List<ClientAddress> addresses;
//
//
//    // GST State
//    private int stateCode;
//    private String stateName;
//
//    private String webUrl;
//
//
//    // Relation
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "company_id", nullable = false)
//    private Company company;
//}

@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String clientName;
    private String email;
    private String phone;

    private String gstNo;
    private String panNo;
    private String webUrl;

    @OneToMany(
            mappedBy = "client",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ClientAddress> addresses;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
