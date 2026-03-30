package com.cww.invoice.company.controller;

import com.cww.invoice.company.dto.CompanyAddressRequestDTO;
import com.cww.invoice.company.dto.CompanyAddressResponseDTO;
import com.cww.invoice.company.service.CompanyAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies/{companyId}/addresses")
@RequiredArgsConstructor
public class CompanyAddressController {

    private final CompanyAddressService addressService;

    @PostMapping
    public CompanyAddressResponseDTO addAddress(
            @PathVariable UUID companyId,
            @RequestBody CompanyAddressRequestDTO dto
    ) {
        return addressService.addCompanyAddress(companyId, dto);
    }

    @GetMapping
    public List<CompanyAddressResponseDTO> getAddresses(
            @PathVariable UUID companyId
    ) {
        return addressService.getCompanyAddresses(companyId);
    }


    @PutMapping("/{addressId}")
    public CompanyAddressResponseDTO updateAddress(
            @PathVariable UUID addressId,
            @RequestBody CompanyAddressRequestDTO dto){
        return addressService.updateCompanyAddress(addressId, dto);

    }

    @DeleteMapping("/{addressId}")
    public void deleteAddress(@PathVariable UUID addressId) {
        addressService.deleteCompanyAddress(addressId);
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<CompanyAddressResponseDTO> getCompanyAddressById(
            @PathVariable UUID companyId,
            @PathVariable UUID addressId
    ) {
        return ResponseEntity.ok(
                addressService.getAddressById(companyId, addressId)
        );
    }
}
