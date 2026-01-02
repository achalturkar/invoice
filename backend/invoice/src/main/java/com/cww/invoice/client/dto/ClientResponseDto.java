package com.cww.invoice.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ClientResponseDto {
    private UUID id;
    private String clientName;
    private String email;
    private String phone;
    private String gstNo;
    private String panNo;
    private String billingAddress;
    private String shippingAddress;
    private int stateCode;
    private String stateName;
}

