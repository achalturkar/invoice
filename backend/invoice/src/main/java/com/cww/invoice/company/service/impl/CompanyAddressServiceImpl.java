package com.cww.invoice.company.service.impl;

import com.cww.invoice.client.entity.ClientAddress;
import com.cww.invoice.company.dto.CompanyAddressRequestDTO;
import com.cww.invoice.company.dto.CompanyAddressResponseDTO;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.entity.CompanyAddress;
import com.cww.invoice.company.mapper.CompanyAddressMapper;
import com.cww.invoice.company.repository.CompanyAddressRepository;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.company.service.CompanyAddressService;
import com.cww.invoice.location.entity.Country;
import com.cww.invoice.location.entity.State;
import com.cww.invoice.location.repository.CountryRepository;
import com.cww.invoice.location.repository.StateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyAddressServiceImpl implements CompanyAddressService {

    private final CompanyRepository companyRepository;
    private final CompanyAddressRepository addressRepository;
    private final StateRepository stateRepository;
    private final CountryRepository countryRepository;

    @Override
    public CompanyAddressResponseDTO addCompanyAddress(UUID companyId, CompanyAddressRequestDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        // 🔹 If primary → make all old primary false
        if (Boolean.TRUE.equals(dto.getIsPrimary())) {
            List<CompanyAddress> primaries =
                    addressRepository.findByCompanyIdAndIsPrimaryTrue(companyId);

            for (CompanyAddress addr : primaries) {
                addr.setIsPrimary(false);
            }
            addressRepository.saveAll(primaries);
        }

        State state = stateRepository.findById(dto.getStateId())
                .orElseThrow(() -> new RuntimeException("State not found"));

        Country country = countryRepository.findById(dto.getCountryId())
                .orElseThrow(() -> new RuntimeException("Country not found"));

        CompanyAddress address = new CompanyAddress();
        address.setAddressLine1(dto.getAddressLine1());
        address.setAddressLine2(dto.getAddressLine2());
        address.setCity(dto.getCity());
        address.setDistrict(dto.getDistrict());
        address.setPincode(dto.getPincode());
        address.setIsPrimary(dto.getIsPrimary());
        address.setState(state);
        address.setCountry(country);
        address.setCompany(company);

        CompanyAddress saved = addressRepository.save(address);

        return CompanyAddressMapper.toDto(saved);
    }

    @Override
    public List<CompanyAddressResponseDTO> getCompanyAddresses(UUID companyId) {
        return addressRepository.findByCompanyId(companyId)
                .stream()
                .map(CompanyAddressMapper::toDto)
                .toList();
    }

    @Override
    public void deleteCompanyAddress(UUID addressId) {
        addressRepository.deleteById(addressId);
    }


    @Override
    public CompanyAddressResponseDTO getAddressById(
            UUID companyId,
            UUID addressId
    ) {

        CompanyAddress address = addressRepository
                .findByIdAndCompanyId(addressId, companyId)
                .orElseThrow(() ->
                        new RuntimeException("Company address not found")
                );

        return CompanyAddressMapper.toDto(address);
    }

    @Override
    public CompanyAddressResponseDTO updateCompanyAddress(UUID addressId, CompanyAddressRequestDTO dto) {

        CompanyAddress address = addressRepository.findById(addressId).orElseThrow(()->new RuntimeException("Address Not found"));

        address.setAddressLine1(dto.getAddressLine1());
        address.setAddressLine2(dto.getAddressLine2());
        address.setCity(dto.getCity());
        address.setDistrict(dto.getDistrict());
        address.setPincode(dto.getPincode());
        address.setIsPrimary(dto.getIsPrimary());

        if (dto.getStateId() != null) {
            address.setState(
                    stateRepository.findById(dto.getStateId())
                            .orElseThrow(() -> new RuntimeException("State not found"))
            );
        }

        if (dto.getCountryId() != null) {
            address.setCountry(
                    countryRepository.findById(dto.getCountryId())
                            .orElseThrow(() -> new RuntimeException("Country not found"))
            );
        }

        CompanyAddress savedAddress = addressRepository.save(address);

        return CompanyAddressMapper.toDto(address);

    }
}
