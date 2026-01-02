package com.cww.invoice.company.entity;

import com.cww.invoice.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "companies")
@Getter
@Setter
public class Company extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String email;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String webUrl;


    private String state;

    private String stateCode;

    private String gstNo;
    private String panNo;

    private String logo_url;
    private String stamp_url;
    private String sign_url;

    @Enumerated(EnumType.STRING)
    private CompanyStatus status;
}
