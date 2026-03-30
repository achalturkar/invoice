package com.cww.invoice.employee.services;

import com.cww.invoice.employee.dto.*;
import com.cww.invoice.employee.entity.*;
import com.cww.invoice.employee.entity.enums.*;
import com.cww.invoice.employee.mapper.EmployeeMapper;
import com.cww.invoice.employee.repository.*;
import com.cww.invoice.common.storage.StorageService;
import com.cww.invoice.company.entity.Company;
import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.user.entity.Role;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

import static com.cww.invoice.employee.mapper.EmployeeMapper.mapToDto;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepo;
    private final EmployeeDocumentRepository documentRepo;
    private final CompanyRepository companyRepo;
    private final StorageService storageService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.storage.employee}")
    private String baseFolder;

    /* ================= employee ================= */

    @Transactional
    public EmployeeResponseDto createEmployee(EmployeeRequestDto request) {

        User loggedUser = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Employee manager = null;
        if (request.getManagerId() != null) {
            manager = employeeRepo.findById(request.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
        }

        Employee teamLead = null;
        if (request.getTeamLeadId() != null) {
            teamLead = employeeRepo.findById(request.getTeamLeadId())
                    .orElseThrow(() -> new RuntimeException("Team Lead not found"));
        }

        // CREATE USER
        User user = new User();
        user.setName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(
                request.getRole() != null
                        ? request.getRole()
                        : Role.EMPLOYEE
        );

        user.setCompany(loggedUser.getCompany());

        userRepository.save(user);

        // CREATE EMPLOYEE
        Employee employee = new Employee();

        employee.setFullName(request.getFullName());
        employee.setPhone(request.getPhone());
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        employee.setExperienceYears(request.getExperienceYears());
        employee.setSkills(request.getSkills());
        employee.setEmploymentType(request.getEmploymentType());
        employee.setStatus(EmployeeStatus.ACTIVE);

        employee.setCompany(loggedUser.getCompany());

        employee.setUser(user);

        employee.setManager(manager);

        employee.setTeamLead(teamLead);

        employeeRepo.save(employee);

        return EmployeeMapper.mapToDto(employee);
    }


    public List<EmployeeResponseDto> getAll(UUID companyId) {
        return employeeRepo.findByCompanyId(companyId)
                .stream().map(EmployeeMapper::mapToDto).toList();
    }


    public EmployeeResponseDto getById(UUID companyId, UUID id) {
        Employee c = employeeRepo.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return mapToDto(c);
    }

    public EmployeeResponseDto getByUserId(UUID companyId, UUID id) {
        Employee c = employeeRepo.findByUser_IdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return mapToDto(c);
    }

    public EmployeeResponseDto update(UUID companyId, UUID id, EmployeeRequestDto dto) {
        Employee c = employeeRepo.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        mapEmployee(c, dto);
        employeeRepo.save(c);
        return mapToDto(c);
    }

    public void deactivate(UUID companyId, UUID id) {
        Employee c = employeeRepo.findByIdAndCompanyId(id, companyId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        c.setStatus(EmployeeStatus.INACTIVE);
        employeeRepo.save(c);
    }

    public void deleteEmployee(UUID companyId, UUID id){
        employeeRepo.deleteById(id);
    }

    /* ================= DOCUMENT ================= */

    public EmployeeDocumentDto uploadDocument(
            UUID companyId,
            UUID employeeId,
            DocumentType type,
            MultipartFile file
    ) {
        Employee employee = employeeRepo
                .findByIdAndCompanyId(employeeId, companyId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        documentRepo.findByEmployeeIdAndDocumentType(employeeId, type)
                .ifPresent(d -> {
                    throw new RuntimeException(type + " already uploaded");
                });

        String folder = baseFolder + "/" + employeeId + "/" + type.name().toLowerCase();
        String url = storageService.upload(file, folder);


        EmployeeDocument doc = new EmployeeDocument();
        doc.setEmployee(employee);
        doc.setDocumentType(type);
        doc.setDocumentUrl(url);
        doc.setVerificationStatus(VerificationStatus.PENDING);

        documentRepo.save(doc);
        return mapDoc(doc);
    }

    public List<EmployeeDocumentDto> getDocuments(UUID companyId, UUID employeeId) {
        employeeRepo.findByIdAndCompanyId(employeeId, companyId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return documentRepo.findByEmployeeId(employeeId)
                .stream().map(this::mapDoc).toList();
    }

    public void verifyDocument(UUID documentId, VerificationStatus status, String remarks) {
        EmployeeDocument doc = documentRepo.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        doc.setVerificationStatus(status);
        doc.setRemarks(remarks);
        documentRepo.save(doc);
    }

    /* ================= MAPPERS ================= */

    private void mapEmployee(Employee c, EmployeeRequestDto dto) {
        Employee manager = null;
        if (dto.getManagerId() != null) {
            manager = employeeRepo.findByUser_Id(dto.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
        }

        Employee teamLead = null;
        if(dto.getTeamLeadId() != null){
            teamLead = employeeRepo.findByUser_Id(dto.getTeamLeadId())
                    .orElseThrow(()-> new RuntimeException("Team Lead Not Found"));

        }
        c.setFullName(dto.getFullName());
        c.setPhone(dto.getPhone());
        c.setSkills(dto.getSkills());
        c.setExperienceYears(dto.getExperienceYears());
        c.setEmploymentType(dto.getEmploymentType());
        c.setManager(manager);
        c.setTeamLead(teamLead);
    }

//    private EmployeeResponseDto mapToDto(Employee c) {
//        EmployeeResponseDto dto = new EmployeeResponseDto();
//        dto.setId(c.getId());
//        dto.setFullName(c.getFullName());
//        dto.setEmail(c.getEmail());
//        dto.setPhone(c.getPhone());
//        dto.setSkills(c.getSkills());
//        dto.setExperienceYears(c.getExperienceYears());
//        dto.setEmploymentType(c.getEmploymentType());
//        dto.setStatus(c.getStatus());
//        return dto;
//    }

    private EmployeeDocumentDto mapDoc(EmployeeDocument d) {
        EmployeeDocumentDto dto = new EmployeeDocumentDto();
        dto.setId(d.getId());
        dto.setDocumentType(d.getDocumentType());
        dto.setDocumentUrl(d.getDocumentUrl());
        dto.setVerificationStatus(d.getVerificationStatus());
        dto.setRemarks(d.getRemarks());
        return dto;
    }
}
