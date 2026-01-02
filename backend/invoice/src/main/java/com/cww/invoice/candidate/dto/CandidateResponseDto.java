package com.cww.invoice.candidate.dto;

import com.cww.invoice.candidate.entity.enums.*;
import lombok.*;

import java.util.UUID;

@Data
public class CandidateResponseDto {
    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private String skills;
    private Integer experienceYears;
    private EmploymentType employmentType;
    private CandidateStatus status;
}
