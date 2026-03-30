package com.cww.invoice.company.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CompanyAddressRequestDTO {

    private String addressLine1;
    private String addressLine2;

    private String city;
    private String district;
    private String pincode;

    private UUID stateId;
    private UUID countryId;

    private Boolean isPrimary;
}

