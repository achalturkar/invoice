package com.cww.invoice.company.service;


import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.company.dto.CompanyResponseDto;
import com.cww.invoice.company.dto.CompanyUpdateDto;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    private StorageService storageService;

    @Value("${app.storage.company.logo}")
    private String logoFolder;

    @Value("${app.storage.company.stamp}")
    private String stampFolder;

    @Value("${app.storage.company.sign}")
    private String signFolder;

    public CompanyResponseDto uploadCompanyImage(
            UUID companyId,
            String type,
            MultipartFile file
    ) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        String folder = switch (type) {
            case "logo" -> logoFolder;
            case "stamp" -> stampFolder;
            case "sign" -> signFolder;
            default -> throw new RuntimeException("Invalid type");
        };

        String imageUrl = storageService.upload(file, folder);

        if (type.equals("logo")) company.setLogo_url(imageUrl);
        if (type.equals("stamp")) company.setStamp_url(imageUrl);
        if (type.equals("sign")) company.setSign_url(imageUrl);

        companyRepository.save(company);
        return mapToDto(company);
    }


    // VIEW PROFILE
    public CompanyResponseDto getCompanyProfile(UUID companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        return mapToDto(company);
    }



    // UPDATE PROFILE
    public CompanyResponseDto updateCompanyProfile(UUID companyId, CompanyUpdateDto dto) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setName(dto.getName());
        company.setEmail(dto.getEmail());
        company.setPhone(dto.getPhone());
        company.setAddress(dto.getAddress());
        company.setWebUrl(dto.getWebUrl());
        company.setState(dto.getState());
        company.setStateCode(dto.getStateCode());
        company.setGstNo(dto.getGstNo());
        company.setPanNo(dto.getPanNo());
        company.setLogo_url(dto.getLogoUrl());
        company.setStamp_url(dto.getStampUrl());
        company.setSign_url(dto.getSignUrl());

        companyRepository.save(company);
        return mapToDto(company);
    }

    private CompanyResponseDto mapToDto(Company company) {
        CompanyResponseDto dto = new CompanyResponseDto();
        dto.setId(company.getId());
        dto.setName(company.getName());
        dto.setEmail(company.getEmail());
        dto.setPhone(company.getPhone());
        dto.setAddress(company.getAddress());
        dto.setWebUrl(company.getWebUrl());
        dto.setState(company.getState());
        dto.setStateCode(company.getStateCode());
        dto.setGstNo(company.getGstNo());
        dto.setPanNo(company.getPanNo());
        dto.setLogoUrl(company.getLogo_url());
        dto.setStampUrl(company.getStamp_url());
        dto.setSignUrl(company.getSign_url());
        return dto;
    }
}

