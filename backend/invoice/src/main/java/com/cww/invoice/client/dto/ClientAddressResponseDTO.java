package com.cww.invoice.client.dto;

import com.cww.invoice.client.entity.AddressType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ClientAddressResponseDTO {

    private UUID id;

    private String addressLine1;
    private String addressLine2;
    private String city;
    private String district;
    private String pincode;

    private AddressType addressType;
    private Boolean isPrimary;

    // STATE
    private UUID stateId;
    private String stateName;
    private String stateCode;      // MH, DL
    private String gstStateCode;   // 27, 07

    // COUNTRY
    private UUID countryId;
    private String countryName;

}

