package com.cww.invoice.employee.mapper;

import com.cww.invoice.employee.dto.EmployeeResponseDto;
import com.cww.invoice.employee.entity.Employee;
import com.cww.invoice.user.entity.User;

public class EmployeeMapper {

    public static EmployeeResponseDto mapToDto(Employee employee){

        EmployeeResponseDto dto = new EmployeeResponseDto();

        dto.setId(employee.getId());
        dto.setEmployeeId(employee.getEmployeeId());
        dto.setFullName(employee.getFullName());
        dto.setPhone(employee.getPhone());
        dto.setStatus(employee.getStatus());
        dto.setDesignation(employee.getDesignation());
        dto.setDepartment(employee.getDepartment());

        if(employee.getUser() != null){
            dto.setEmail(employee.getUser().getEmail());
            dto.setRole(employee.getUser().getRole().name());
            dto.setUserId(employee.getUser().getId());
        }

        if(employee.getManager() != null){
            dto.setManagerName(employee.getManager().getFullName());
            dto.setManagerId(employee.getManager().getUser().getId());
        }

        if(employee.getTeamLead() != null){
            dto.setTeamLeadName(employee.getTeamLead().getFullName());
            dto.setTeamLeadId(employee.getTeamLead().getUser().getId());
        }

        return dto;
    }
}

