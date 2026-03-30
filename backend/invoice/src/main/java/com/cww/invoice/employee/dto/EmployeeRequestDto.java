package com.cww.invoice.employee.dto;

import com.cww.invoice.employee.entity.enums.EmploymentType;
import com.cww.invoice.user.entity.Role;
import lombok.*;

import java.util.UUID;

@Data
public class EmployeeRequestDto {
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String skills;
    private String department;
    private String designation;
    private Role role;
    private Integer experienceYears;
    private EmploymentType employmentType;
    private UUID managerId;
    private UUID teamLeadId;


}
