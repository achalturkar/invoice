package com.cww.invoice.company.service;

import com.cww.invoice.company.dto.CompanyAddressRequestDTO;
import com.cww.invoice.company.dto.CompanyAddressResponseDTO;

import java.util.List;
import java.util.UUID;

public interface CompanyAddressService {

    CompanyAddressResponseDTO addCompanyAddress(UUID companyId, CompanyAddressRequestDTO dto);

    List<CompanyAddressResponseDTO> getCompanyAddresses(UUID companyId);

    void deleteCompanyAddress(UUID addressId);

    CompanyAddressResponseDTO updateCompanyAddress(UUID addressId, CompanyAddressRequestDTO dto);

    CompanyAddressResponseDTO  getAddressById(UUID companyid, UUID AddressId);
}
