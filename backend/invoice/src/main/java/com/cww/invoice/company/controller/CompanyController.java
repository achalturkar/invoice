package com.cww.invoice.company.controller;

import com.cww.invoice.common.util.ImageValidator;
import com.cww.invoice.company.dto.CompanyResponseDto;
import com.cww.invoice.company.dto.CompanyUpdateDto;
import com.cww.invoice.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    // VIEW COMPANY PROFILE
    @GetMapping("/{companyId}")
    public CompanyResponseDto getCompany(@PathVariable UUID companyId) {
        return companyService.getCompanyProfile(companyId);
    }

    // EDIT COMPANY PROFILE
    @PutMapping("/{companyId}")
    public CompanyResponseDto updateCompany(
            @PathVariable UUID companyId,
            @RequestBody CompanyUpdateDto dto
    ) {
        return companyService.updateCompanyProfile(companyId, dto);
    }

    @PostMapping("/{companyId}/upload-image")
    public CompanyResponseDto uploadImage(
            @PathVariable UUID companyId,
            @RequestParam("type") String type,
            @RequestParam("file") MultipartFile file
    ) {
        ImageValidator.validate(file);
        return companyService.uploadCompanyImage(companyId, type, file);
    }

}
