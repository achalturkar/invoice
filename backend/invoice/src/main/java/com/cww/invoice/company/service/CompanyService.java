package com.cww.invoice.company.service;


import com.cww.invoice.client.mapper.ClientAddressMapper;
import com.cww.invoice.common.dto.ImageResponse;
import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.company.dto.CompanyResponseDto;
import com.cww.invoice.company.dto.CompanyUpdateDto;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.entity.CompanyStatus;
import com.cww.invoice.company.mapper.CompanyAddressMapper;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.invoice.dto.FileResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    private StorageService storageService;

    @Value("${app.storage.root}")
    private String storageRoot;

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

        String path = storageService.uploadCompanyAsset(
                file,
                companyId.toString(),
                type
        );

        switch (type.toLowerCase()) {
            case "logo" -> company.setLogoPath(path);
            case "stamp" -> company.setStampPath(path);
            case "sign" -> company.setSignPath(path);
            default -> throw new RuntimeException("Invalid type");
        }

        companyRepository.save(company);

        return mapToDto(company); // ✅ IMPORTANT
    }




    // VIEW PROFILE
    public CompanyResponseDto getCompanyProfile(UUID companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        return mapToDto(company);
    }

    public ImageResponse getCompanyImage(UUID companyId, String type) throws IOException {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        String imagePath = switch (type) {
            case "logo" -> company.getLogoPath();
            case "stamp" -> company.getStampPath();
            case "sign" -> company.getSignPath();
            default -> throw new RuntimeException("Invalid image type");
        };

        if (imagePath == null)
            throw new RuntimeException("Image not uploaded");

        Path path = Paths.get(storageRoot).resolve(imagePath);
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists())
            throw new RuntimeException("Image not found");

        String contentType = Files.probeContentType(path);

        return new ImageResponse(resource, contentType);
    }



    public void updateCompanyStatus(UUID companyId, CompanyStatus status) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setStatus(status);
        companyRepository.save(company);
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
        company.setLutNo(dto.getLutNo());
        company.setCinNo(dto.getCinNo());
//        company.setLogoPath(dto.getLogoPath());
//        company.setStampPath(dto.getStampPath());
//        company.setSignPath(dto.getSignPath());
        company.setCompanyCode(dto.getCompanyCode());


        companyRepository.save(company);
        return mapToDto(company);
    }

    @Transactional
    public void updateStatus(UUID companyId, CompanyStatus status) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setStatus(status);
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
        dto.setLutNo(company.getLutNo());
        dto.setCinNo(company.getCinNo());
//        dto.setLogoPath(company.getLogoPath());
//        dto.setStampPath(company.getStampPath());
//        dto.setSignPath(company.getSignPath());
        // ✅ Dynamic image URLs (NOT stored in DB)
        dto.setLogoPath(
                company.getLogoPath() == null
                        ? null
                        : "/api/company/" + company.getId() + "/image/logo"
        );

        dto.setStampPath(
                company.getStampPath() == null
                        ? null
                        : "/api/company/" + company.getId() + "/image/stamp"
        );

        dto.setSignPath(
                company.getSignPath() == null
                        ? null
                        : "/api/company/" + company.getId() + "/image/sign"
        );

        dto.setCompanyCode(company.getCompanyCode());

//        dto.setCompanyAddressResponseDTO();


        return dto;
    }


}

