package com.cww.invoice.superadmin.controller;


import com.cww.invoice.company.dto.CreateCompanyRequest;
import com.cww.invoice.company.dto.CreateCompanyWithAdminRequest;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.companyadmin.dto.CreateCompanyAdminRequest;
import com.cww.invoice.superadmin.service.SuperAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/super-admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminController {

    private final SuperAdminService superAdminService;




    // Create Company
    @PostMapping("/companies")
    public String createCompany(@Valid @RequestBody CreateCompanyRequest request) {
        return superAdminService.createCompany(request);
    }

    @PostMapping("/create-company-with-admin")
    public ResponseEntity<String> createCompanyWithAdmin(
            @RequestBody CreateCompanyWithAdminRequest request
    ) {
        return ResponseEntity.ok(
                superAdminService.createCompanyWithAdmin(request)
        );
    }

    // List of All Companies
    @GetMapping("/all-companies")
    public List<Company> getAllCompany(){
        return superAdminService.findAllCompanies();
    }

    //Count Companies
    @GetMapping("/companies-count")
     public Long getCountCompanies(){
        return superAdminService.companiesCount();
    }

    //  Create Company Admin
    @PostMapping("/companies/{companyId}/admin")
    public String createCompanyAdmin(
            @PathVariable UUID companyId,
            @RequestBody CreateCompanyAdminRequest request
    ) {
        return superAdminService.createCompanyAdmin(companyId, request);
    }
}
