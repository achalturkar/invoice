package com.cww.invoice.company.mapper;

import com.cww.invoice.company.dto.CompanyAddressResponseDTO;
import com.cww.invoice.company.entity.CompanyAddress;

public class CompanyAddressMapper {

    public static CompanyAddressResponseDTO toDto(CompanyAddress address) {

        if (address == null) return null;

        CompanyAddressResponseDTO.CompanyAddressResponseDTOBuilder dto =
                CompanyAddressResponseDTO.builder()
                        .id(address.getId())
                        .addressLine1(address.getAddressLine1())
                        .addressLine2(address.getAddressLine2())
                        .city(address.getCity())
                        .district(address.getDistrict())
                        .pincode(address.getPincode())
                        .isPrimary(address.getIsPrimary());

        if (address.getState() != null) {
            dto.stateId(address.getState().getId())
                    .stateName(address.getState().getStateName())
                    .stateCode(address.getState().getStateCode());
        }

        if (address.getCountry() != null) {
            dto.countryId(address.getCountry().getId())
                    .countryName(address.getCountry().getCountryName());
        }

        return dto.build();
    }
}
