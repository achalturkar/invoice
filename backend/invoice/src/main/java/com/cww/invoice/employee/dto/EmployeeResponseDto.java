package com.cww.invoice.employee.dto;

import com.cww.invoice.employee.entity.enums.*;
import com.cww.invoice.user.entity.User;
import lombok.*;

import java.util.UUID;

@Data
public class EmployeeResponseDto {
    private UUID id;
    private String employeeId;
    private UUID userId;
    private String fullName;
    private String email;
    private String phone;
    private EmployeeStatus status;
    private String designation;
    private String department;
    private String role;
    private String managerName;
    private UUID managerId;
    private String teamLeadName;
    private UUID teamLeadId;
}
