package com.cww.invoice.client.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientRequestDto {
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

