package com.cww.invoice.client.dto;


import com.cww.invoice.client.entity.AddressType;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ClientAddressRequestDTO {

    private String addressLine1;
    private String addressLine2;

    private String city;
    private String district;
    private String pincode;

    private UUID stateId;
    private UUID countryId;

    private AddressType addressType; // BILLING / SHIPPING
    private Boolean isPrimary = false;
}

