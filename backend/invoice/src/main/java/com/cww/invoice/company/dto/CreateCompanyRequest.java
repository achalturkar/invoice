package com.cww.invoice.company.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCompanyRequest {
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    private String phone;
    private String address;
    private String state;
    private String stateCode;
    private String gstNo;
    private String panNo;
}
