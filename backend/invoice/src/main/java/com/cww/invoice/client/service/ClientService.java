package com.cww.invoice.client.service;

import com.cww.invoice.client.dto.ClientRequestDto;
import com.cww.invoice.client.dto.ClientResponseDto;
import com.cww.invoice.client.entity.Client;
import com.cww.invoice.client.repository.ClientRepository;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final CompanyRepository companyRepository;

    public List<ClientResponseDto> getAllByCompany(UUID companyId) {
        return clientRepository.findByCompanyId(companyId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public ClientResponseDto getById(UUID companyId, UUID id) {
        Client client = clientRepository
                .findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return mapToDto(client);
    }

    public ClientResponseDto create(UUID companyId, ClientRequestDto dto) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Client client = new Client();
        client.setCompany(company);
        updateFields(client, dto);

        clientRepository.save(client);
        return mapToDto(client);
    }

    public ClientResponseDto update(UUID companyId, UUID id, ClientRequestDto dto) {
        Client client = clientRepository
                .findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        updateFields(client, dto);
        clientRepository.save(client);
        return mapToDto(client);
    }

    public void delete(UUID companyId, UUID id) {
        Client client = clientRepository
                .findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        clientRepository.delete(client);
    }

    /* helpers */
    private void updateFields(Client client, ClientRequestDto dto) {
        client.setClientName(dto.getClientName());
        client.setEmail(dto.getEmail());
        client.setPhone(dto.getPhone());
        client.setGstNo(dto.getGstNo());
        client.setPanNo(dto.getPanNo());
        client.setBillingAddress(dto.getBillingAddress());
        client.setShippingAddress(dto.getShippingAddress());
        client.setStateCode(dto.getStateCode());
        client.setStateName(dto.getStateName());
    }

    private ClientResponseDto mapToDto(Client client) {
        ClientResponseDto dto = new ClientResponseDto();
        dto.setId(client.getId());
        dto.setClientName(client.getClientName());
        dto.setEmail(client.getEmail());
        dto.setPhone(client.getPhone());
        dto.setGstNo(client.getGstNo());
        dto.setPanNo(client.getPanNo());
        dto.setBillingAddress(client.getBillingAddress());
        dto.setShippingAddress(client.getShippingAddress());
        dto.setStateCode(client.getStateCode());
        dto.setStateName(client.getStateName());
        return dto;
    }
}
