package com.cww.invoice.project.controller;

import com.cww.invoice.project.dto.*;
import com.cww.invoice.project.entity.enums.ProjectStatus;
import com.cww.invoice.project.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/company/{companyId}/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService service;

    @PostMapping
    public ProjectResponseDto create(
            @PathVariable UUID companyId,
            @RequestBody ProjectRequestDto dto
    ) {
        return service.createProject(companyId, dto);
    }

    @GetMapping
    public List<ProjectResponseDto> getAll(
            @PathVariable UUID companyId
    ) {
        return service.allProject(companyId);
    }

    @GetMapping("/{id}")
    public ProjectResponseDto getById(
            @PathVariable UUID companyId,
            @PathVariable UUID id
    ) {
        return service.getProjectById(companyId, id);
    }

    @PutMapping("/{id}")
    public ProjectResponseDto update(
            @PathVariable UUID companyId,
            @PathVariable UUID id,
            @RequestBody ProjectRequestDto dto
    ) {
        return service.update(companyId, id, dto);
    }

    @PatchMapping("/{id}/status")
    public void updateStatus(
            @PathVariable UUID companyId,
            @PathVariable UUID id,
            @RequestParam ProjectStatus status
    ) {
        service.updateStatus(companyId, id, status);
    }
}

