package com.cww.invoice.company.controller;

import com.cww.invoice.common.dto.ImageResponse;
import com.cww.invoice.common.util.ImageValidator;
import com.cww.invoice.company.dto.CompanyResponseDto;
import com.cww.invoice.company.dto.CompanyUpdateDto;
import com.cww.invoice.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    /* ================= PROFILE ================= */

    @GetMapping("/{companyId}")
    public CompanyResponseDto getCompany(@PathVariable UUID companyId) {
        return companyService.getCompanyProfile(companyId);
    }

    /* ================= IMAGE VIEW ================= */

    @GetMapping("/{companyId}/image/{type}")
    public ResponseEntity<Resource> viewCompanyImage(
            @PathVariable UUID companyId,
            @PathVariable String type
    ) throws IOException {

        ImageResponse image = companyService.getCompanyImage(companyId, type);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getContentType()))
                .header("Cache-Control", "no-cache, no-store, must-revalidate")
                .header("Pragma", "no-cache")
                .header("Expires", "0")
                .body(image.getResource());
    }

    /* ================= IMAGE UPLOAD ================= */

    @PostMapping(
            value = "/{companyId}/image/{type}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public CompanyResponseDto uploadCompanyImage(
            @PathVariable UUID companyId,
            @PathVariable String type,
            @RequestParam("file") MultipartFile file
    ) {

        ImageValidator.validate(file); // size + extension validation

        return companyService.uploadCompanyImage(companyId, type, file);
    }

    /* ================= UPDATE PROFILE ================= */

    @PutMapping("/{companyId}")
    public CompanyResponseDto updateCompany(
            @PathVariable UUID companyId,
            @RequestBody CompanyUpdateDto dto
    ) {
        return companyService.updateCompanyProfile(companyId, dto);
    }



}
