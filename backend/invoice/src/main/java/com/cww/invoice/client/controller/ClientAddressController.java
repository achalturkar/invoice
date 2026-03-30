package com.cww.invoice.client.controller;

import com.cww.invoice.client.dto.ClientAddressRequestDTO;
import com.cww.invoice.client.dto.ClientAddressResponseDTO;
import com.cww.invoice.client.entity.ClientAddress;
import com.cww.invoice.client.repository.ClientRepository;
import com.cww.invoice.client.service.ClientAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/company/{companyId}/clients/{clientId}/addresses")
@RequiredArgsConstructor
public class ClientAddressController {

    private final ClientAddressService addressService;
    private final ClientRepository clientRepository;

    /* ===================== CREATE ===================== */

    @PostMapping
    public ClientAddressResponseDTO addAddress(
            @PathVariable UUID companyId,
            @PathVariable UUID clientId,
            @RequestBody ClientAddressRequestDTO dto
    ) {
        validateClient(companyId, clientId);
        return addressService.addClientAddress(clientId, dto);
    }

    @PostMapping("/bulk")
    public List<ClientAddressResponseDTO> addMultipleAddress(
            @PathVariable UUID companyId,
            @PathVariable UUID clientId,
            @RequestBody List<ClientAddressRequestDTO> dtoList
    ) {
        validateClient(companyId, clientId);
        return addressService.addMultipleAddress(clientId, dtoList);
    }

    /* ===================== READ ===================== */

    @GetMapping
    public List<ClientAddressResponseDTO> getAddresses(
            @PathVariable UUID companyId,
            @PathVariable UUID clientId
    ) {
        validateClient(companyId, clientId);
        return addressService.getClientAddresses(clientId);
    }

    /* ===================== UPDATE ===================== */

    @PutMapping("/{addressId}")
    public ClientAddressResponseDTO updateAddress(
            @PathVariable UUID companyId,
            @PathVariable UUID clientId,
            @PathVariable UUID addressId,
            @RequestBody ClientAddressRequestDTO dto
    ) {
        validateClient(companyId, clientId);
        return addressService.updateClientAddress(clientId, addressId, dto);
    }

    /* ===================== DELETE ===================== */

    @DeleteMapping("/{addressId}")
    public void deleteAddress(
            @PathVariable UUID companyId,
            @PathVariable UUID clientId,
            @PathVariable UUID addressId
    ) {
        validateClient(companyId, clientId);
        addressService.deleteClientAddress(clientId, addressId);
    }

    /* ===================== VALIDATION ===================== */

    private void validateClient(UUID companyId, UUID clientId) {
        clientRepository.findByIdAndCompanyId(clientId, companyId)
                .orElseThrow(() ->
                        new RuntimeException("Client not found for company"));
    }
}
