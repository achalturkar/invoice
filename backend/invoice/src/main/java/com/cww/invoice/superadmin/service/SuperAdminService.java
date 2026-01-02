package com.cww.invoice.superadmin.service;


import com.cww.invoice.company.dto.CreateCompanyRequest;
import com.cww.invoice.company.dto.CreateCompanyWithAdminRequest;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.entity.CompanyStatus;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.companyadmin.dto.CreateCompanyAdminRequest;
import com.cww.invoice.user.entity.Role;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SuperAdminService {

    private final CompanyRepository companyRepository;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Company> findAllCompanies(){
        return companyRepository.findAll();
    }

    public Long companiesCount(){
        return companyRepository.count();
    }

    // create company admin
    @Transactional
    public String createCompanyWithAdmin(CreateCompanyWithAdminRequest request) {

        //  Validation
        if (companyRepository.existsByEmail(request.getCompanyEmail())) {
            throw new RuntimeException("Company email already exists");
        }

        if (userRepository.existsByEmail(request.getAdminEmail())) {
            throw new RuntimeException("Admin email already exists");
        }

        //  Create Company
        Company company = new Company();
        company.setName(request.getCompanyName());
        company.setEmail(request.getCompanyEmail());
        company.setPhone(request.getCompanyPhone());
        company.setAddress(request.getAddress());
        company.setState(request.getState());
        company.setStateCode(request.getStateCode());
        company.setGstNo(request.getGstNo());
        company.setPanNo(request.getPanNo());
        company.setStatus(CompanyStatus.ACTIVE);

        companyRepository.save(company);

        // Create Company Admin
        User admin = User.builder()
                .name(request.getAdminName())
                .email(request.getAdminEmail())
                .phone(request.getAdminPhone())
                .password(passwordEncoder.encode(request.getAdminPassword()))
                .role(Role.COMPANY_ADMIN)
                .company(company)
                .build();

        userRepository.save(admin);

        return "Company & Company Admin created successfully";
    }


    // Create Company
    public String createCompany(CreateCompanyRequest request) {

        if (companyRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Company email already exists");
        }

        if (request.getGstNo() != null &&
                companyRepository.existsByGstNo(request.getGstNo())) {
            throw new RuntimeException("GST number already exists");
        }

        Company company = new Company();
        company.setName(request.getName());
        company.setEmail(request.getEmail());
        company.setPhone(request.getPhone());
        company.setAddress(request.getAddress());
        company.setState(request.getState());
        company.setStateCode(request.getStateCode());
        company.setGstNo(request.getGstNo());
        company.setPanNo(request.getPanNo());
        company.setStatus(CompanyStatus.ACTIVE);

        companyRepository.save(company);

        return " Company created successfully";
    }




    // Create Company Admin
    public String createCompanyAdmin(UUID companyId, CreateCompanyAdminRequest request) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        User admin = new User();
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setPhone(request.getPhone());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setRole(Role.COMPANY_ADMIN);
        admin.setCompany(company);

        userRepository.save(admin);

        return "✅ Company admin created successfully";
    }
}
