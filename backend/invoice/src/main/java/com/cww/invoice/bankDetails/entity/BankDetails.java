package com.cww.invoice.bankDetails.entity;

import com.cww.invoice.common.entity.BaseEntity;
import com.cww.invoice.company.entity.Company;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "bank_details")
@Getter
@Setter
public class BankDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String bankName;
    private String bankBranch;
    private String bankAccountNo;
    private String bankIfsc;
    private String bankAccountName;
    private String swiftCode;
    private String panNo;
    private String tanNo;
    private String udyamRegNo;

//    @Column(nullable = false)
//    private Boolean active = true;


    @OneToOne
    @JoinColumn(name = "company_id", nullable = false, unique = true)
    private Company company;
}
