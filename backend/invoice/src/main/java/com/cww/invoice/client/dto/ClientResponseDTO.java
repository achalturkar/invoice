package com.cww.invoice.client.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ClientResponseDTO {

    private UUID id;
    private String clientName;
    private String email;
    private String phone;

    private String gstNo;
    private String panNo;

    private String webUrl;

    private List<ClientAddressResponseDTO> clientAddresses;

}

