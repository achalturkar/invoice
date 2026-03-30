package com.cww.invoice.client.mapper;

import com.cww.invoice.client.dto.ClientResponseDTO;
import com.cww.invoice.client.entity.Client;

import java.util.List;

public class ClientMapper {

    public static ClientResponseDTO mapToDto(Client client) {
        ClientResponseDTO dto = new ClientResponseDTO();
        dto.setId(client.getId());
        dto.setClientName(client.getClientName());
        dto.setEmail(client.getEmail());
        dto.setPhone(client.getPhone());
        dto.setGstNo(client.getGstNo());
        dto.setPanNo(client.getPanNo());
        dto.setWebUrl(client.getWebUrl());

        if (client.getAddresses() != null) {
            dto.setClientAddresses(
                    client.getAddresses()
                            .stream()
                            .map(ClientAddressMapper::toDto)
                            .toList()
            );
        } else {
            dto.setClientAddresses(List.of()); // optional: empty list
        }
        return dto;
    }
}
