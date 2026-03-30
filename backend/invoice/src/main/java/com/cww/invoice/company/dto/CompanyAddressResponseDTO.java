package com.cww.invoice.company.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class CompanyAddressResponseDTO {

    private UUID id;

    private String addressLine1;
    private String addressLine2;

    private String city;
    private String district;
    private String pincode;

    private UUID stateId;
    private String stateName;
    private String stateCode;

    private UUID countryId;
    private String countryName;

    private Boolean isPrimary;
}

