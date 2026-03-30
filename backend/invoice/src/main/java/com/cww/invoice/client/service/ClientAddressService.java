package com.cww.invoice.client.service;

import com.cww.invoice.client.dto.ClientAddressRequestDTO;
import com.cww.invoice.client.dto.ClientAddressResponseDTO;
import com.cww.invoice.client.entity.ClientAddress;

import java.util.List;
import java.util.UUID;

public interface ClientAddressService {

    ClientAddressResponseDTO addClientAddress(UUID clientId, ClientAddressRequestDTO dto);


    List<ClientAddressResponseDTO> getClientAddresses(UUID clientId);

    ClientAddressResponseDTO updateClientAddress(
            UUID clientId,
            UUID addressId,
            ClientAddressRequestDTO dto
    );

    void deleteClientAddress(UUID clientId, UUID addressId);

    List<ClientAddressResponseDTO> addMultipleAddress(
            UUID clientId,
            List<ClientAddressRequestDTO> dtoList
    );

}

