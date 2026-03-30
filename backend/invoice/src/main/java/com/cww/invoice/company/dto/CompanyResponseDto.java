package com.cww.invoice.company.dto;


import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class CompanyResponseDto {
    private UUID id;
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

    private String logoPath;
    private String stampPath;
    private String signPath;
    private String companyCode;

    private List<CompanyAddressResponseDTO> companyAddress;
}

