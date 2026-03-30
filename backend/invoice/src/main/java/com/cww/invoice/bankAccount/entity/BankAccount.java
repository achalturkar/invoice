package com.cww.invoice.bankAccount.entity;

import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "bank_accounts")
@Getter
@Setter
public class BankAccount extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String bankName;

    private String bankBranch;

    @Column(nullable = false)
    private String bankAccountNo;

    @Column(nullable = false)
    private String bankIfsc;

    private String bankAccountName;

    private String swiftCode;

    private String panNo;
    private String tanNo;
    private String udyamRegNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BankAccountStatus status = BankAccountStatus.ACTIVE;

    @Column(nullable = false)
    private Boolean isDefault = false;

    //  Many bank accounts belong to one company
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
