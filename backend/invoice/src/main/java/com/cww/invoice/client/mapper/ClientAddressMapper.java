package com.cww.invoice.client.mapper;

import com.cww.invoice.client.dto.ClientAddressResponseDTO;
import com.cww.invoice.client.entity.ClientAddress;

public final class ClientAddressMapper {

    private ClientAddressMapper() {}

    public static ClientAddressResponseDTO toDto(ClientAddress a) {

        ClientAddressResponseDTO dto = new ClientAddressResponseDTO();
        dto.setId(a.getId());
        dto.setAddressLine1(a.getAddressLine1());
        dto.setAddressLine2(a.getAddressLine2());
        dto.setCity(a.getCity());
        dto.setDistrict(a.getDistrict());
        dto.setPincode(a.getPincode());
        dto.setAddressType(a.getAddressType());
        dto.setIsPrimary(a.getIsPrimary());

        dto.setStateId(a.getState().getId());
        dto.setStateName(a.getState().getStateName());
        dto.setStateCode(a.getState().getStateCode());
        dto.setGstStateCode(a.getState().getGstStateCode());

        dto.setCountryId(a.getCountry().getId());
        dto.setCountryName(a.getCountry().getCountryName());

        return dto;
    }
}
