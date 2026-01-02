package com.cww.invoice.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    public String token;
    public String role;
    public String companyId;
}

