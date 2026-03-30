package com.cww.invoice.client.service.impl;

import com.cww.invoice.client.dto.ClientAddressRequestDTO;
import com.cww.invoice.client.dto.ClientAddressResponseDTO;
import com.cww.invoice.client.entity.AddressType;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.client.entity.ClientAddress;
import com.cww.invoice.client.mapper.ClientAddressMapper;
import com.cww.invoice.client.repository.ClientAddressRepository;
import com.cww.invoice.client.repository.ClientRepository;
import com.cww.invoice.client.service.ClientAddressService;

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
public class ClientAddressServiceImpl implements ClientAddressService {

    private final ClientRepository clientRepository;
    private final ClientAddressRepository addressRepository;
    private final StateRepository stateRepository;
    private final CountryRepository countryRepository;

    /* ===================== ADD SINGLE ADDRESS ===================== */

    @Override
    public ClientAddressResponseDTO addClientAddress(UUID clientId, ClientAddressRequestDTO dto) {

        Client client = getClient(clientId);

        handlePrimary(clientId, dto.getAddressType(), dto.getIsPrimary(), null);

        ClientAddress address = buildAddress(dto, client);
        return ClientAddressMapper.toDto(addressRepository.save(address));
    }

    /* ===================== ADD MULTIPLE ADDRESS ===================== */

    @Override
    public List<ClientAddressResponseDTO> addMultipleAddress(
            UUID clientId,
            List<ClientAddressRequestDTO> dtoList
    ) {
        Client client = getClient(clientId);

        return dtoList.stream()
                .map(dto -> {
                    handlePrimary(clientId, dto.getAddressType(), dto.getIsPrimary(), null);
                    ClientAddress address = buildAddress(dto, client);
                    return ClientAddressMapper.toDto(addressRepository.save(address));
                })
                .toList();
    }

    /* ===================== GET ===================== */

    @Override
    public List<ClientAddressResponseDTO> getClientAddresses(UUID clientId) {
        return addressRepository.findByClientId(clientId)
                .stream()
                .map(ClientAddressMapper::toDto)
                .toList();
    }

    /* ===================== UPDATE ===================== */

    @Override
    public ClientAddressResponseDTO updateClientAddress(
            UUID clientId,
            UUID addressId,
            ClientAddressRequestDTO dto
    ) {
        ClientAddress address = addressRepository
                .findByIdAndClientId(addressId, clientId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        handlePrimary(clientId, dto.getAddressType(), dto.getIsPrimary(), addressId);

        updateAddressFields(address, dto);
        return ClientAddressMapper.toDto(addressRepository.save(address));
    }

    /* ===================== DELETE ===================== */

    @Override
    public void deleteClientAddress(UUID clientId, UUID addressId) {
        ClientAddress address = addressRepository
                .findByIdAndClientId(addressId, clientId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        addressRepository.delete(address);
    }

    /* ===================== HELPERS ===================== */

    private Client getClient(UUID clientId) {
        return clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }

    private void handlePrimary(
            UUID clientId,
            AddressType type,
            Boolean isPrimary,
            UUID ignoreId
    ) {
        if (Boolean.TRUE.equals(isPrimary)) {
            ClientAddress oldPrimary =
                    addressRepository.findByClientIdAndAddressTypeAndIsPrimaryTrue(
                            clientId, type
                    );
            if (oldPrimary != null &&
                    (ignoreId == null || !oldPrimary.getId().equals(ignoreId))) {
                oldPrimary.setIsPrimary(false);
            }
        }
    }

    private ClientAddress buildAddress(ClientAddressRequestDTO dto, Client client) {
        ClientAddress address = new ClientAddress();
        updateAddressFields(address, dto);
        address.setClient(client);
        return address;
    }

    private void updateAddressFields(ClientAddress address, ClientAddressRequestDTO dto) {
        address.setAddressLine1(dto.getAddressLine1());
        address.setAddressLine2(dto.getAddressLine2());
        address.setCity(dto.getCity());
        address.setDistrict(dto.getDistrict());
        address.setPincode(dto.getPincode());
        address.setAddressType(dto.getAddressType());
        address.setIsPrimary(Boolean.TRUE.equals(dto.getIsPrimary()));

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
    }
}


