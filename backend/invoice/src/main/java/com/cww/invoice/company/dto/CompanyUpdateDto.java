package com.cww.invoice.company.dto;


import lombok.Data;

@Data
public class CompanyUpdateDto {
    private String name;
    private String email;
    private String phone;
    private String address;
    private String webUrl;
    private String state;
    private String stateCode;
    private String gstNo;
    private String panNo;
    private String lutNo;
    private String cinNo;


    //    private String logoPath;
//    private String stampPath;
//    private String signPath;
    private String companyCode;
}

