package com.cww.invoice.client.controller;

import com.cww.invoice.client.dto.ClientRequestDTO;
import com.cww.invoice.client.dto.ClientResponseDTO;
import com.cww.invoice.client.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/company/{companyId}/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public List<ClientResponseDTO> getAll(@PathVariable UUID companyId) {
        return clientService.getAllByCompany(companyId);
    }

    @PostMapping
    public ClientResponseDTO create(
            @PathVariable UUID companyId,
            @RequestBody ClientRequestDTO dto
    ) {
        return clientService.create(companyId, dto);
    }

    @GetMapping("/{id}")
    public ClientResponseDTO getById(
            @PathVariable UUID companyId,
            @PathVariable UUID id
    ) {
        return clientService.getById(companyId, id);
    }

    @PutMapping("/{id}")
    public ClientResponseDTO update(
            @PathVariable UUID companyId,
            @PathVariable UUID id,
            @RequestBody ClientRequestDTO dto
    ) {
        return clientService.update(companyId, id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable UUID companyId,
            @PathVariable UUID id
    ) {
        clientService.delete(companyId, id);
    }
}
