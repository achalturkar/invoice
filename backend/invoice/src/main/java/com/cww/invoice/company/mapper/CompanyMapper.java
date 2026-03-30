package com.cww.invoice.company.mapper;

import com.cww.invoice.company.dto.CompanyAddressResponseDTO;
import com.cww.invoice.company.dto.CompanyResponseDto;
import com.cww.invoice.company.entity.Company;

import java.util.List;
import java.util.stream.Collectors;

public class CompanyMapper {

    public static CompanyResponseDto mapToDto(Company company) {
        CompanyResponseDto dto = new CompanyResponseDto();
        dto.setId(company.getId());
        dto.setName(company.getName());
        dto.setEmail(company.getEmail());
        dto.setPhone(company.getPhone());
        dto.setAddress(company.getAddress());
        dto.setWebUrl(company.getWebUrl());
        dto.setState(company.getState());
        dto.setStateCode(company.getStateCode());
        dto.setGstNo(company.getGstNo());
        dto.setPanNo(company.getPanNo());
        dto.setLutNo(company.getLutNo());
        dto.setCinNo(company.getCinNo());

        // ✅ Dynamic image URLs (NOT stored in DB)
        dto.setLogoPath(
                company.getLogoPath() == null
                        ? null
                        : "/api/company/" + company.getId() + "/image/logo"
        );

        dto.setStampPath(
                company.getStampPath() == null
                        ? null
                        : "/api/company/" + company.getId() + "/image/stamp"
        );

        dto.setSignPath(
                company.getSignPath() == null
                        ? null
                        : "/api/company/" + company.getId() + "/image/sign"
        );

        dto.setCompanyCode(company.getCompanyCode());

        if (company.getAddresses() != null) {

            List<CompanyAddressResponseDTO> addressDtos =
                    company.getAddresses()
                            .stream()
                            .map(CompanyAddressMapper::toDto)
                            .collect(Collectors.toList());

            dto.setCompanyAddress(addressDtos);
        }

        return dto;
    }
}
