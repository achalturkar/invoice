package com.cww.invoice.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClientRequestDTO {
    private String clientName;
    private String email;
    private String phone;

    private String gstNo;
    private String panNo;
    private String webUrl;

    private List<ClientAddressRequestDTO> clientAddresses;

}

