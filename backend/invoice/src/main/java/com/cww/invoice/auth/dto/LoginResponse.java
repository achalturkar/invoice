package com.cww.invoice.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class LoginResponse {
    public String token;
    public String role;
    public String companyId;
    public UUID id;
}

