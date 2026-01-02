package com.cww.invoice.candidate.dto;

import com.cww.invoice.candidate.entity.enums.EmploymentType;
import lombok.*;

@Data
public class CandidateRequestDto {
    private String fullName;
    private String email;
    private String phone;
    private String skills;
    private Integer experienceYears;
    private EmploymentType employmentType;
}
