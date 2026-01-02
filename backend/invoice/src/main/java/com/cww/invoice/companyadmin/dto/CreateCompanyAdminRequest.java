package com.cww.invoice.companyadmin.dto;

import lombok.Data;

@Data
public class CreateCompanyAdminRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
}
