package com.cww.invoice.company.entity;

import com.cww.invoice.bankAccount.entity.BankAccount;
import com.cww.invoice.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
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

    private String  companyCode;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String webUrl;


    private String state;

    private String stateCode;

    @OneToMany(
            mappedBy = "company",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CompanyAddress> addresses;

    private String gstNo;
    private String panNo;
    private String lutNo;
    private String cinNo;


    private String logoPath;
    private String stampPath;
    private String signPath;

    @Enumerated(EnumType.STRING)
    private CompanyStatus status;

    @OneToMany(
            mappedBy = "company",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<BankAccount> bankAccounts;

}
