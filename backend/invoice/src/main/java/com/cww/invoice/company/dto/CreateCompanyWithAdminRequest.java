package com.cww.invoice.company.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCompanyWithAdminRequest {

    // -------- Company --------
    private String companyName;
    private String companyEmail;
    private String companyPhone;
    private String address;
    private String state;
    private String stateCode;
    private String gstNo;
    private String panNo;


    // -------- Company Admin --------
    private String adminName;
    private String adminEmail;
    private String adminPhone;
    private String adminPassword;
}
