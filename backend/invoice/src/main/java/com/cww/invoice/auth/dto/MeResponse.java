package com.cww.invoice.auth.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class MeResponse {
    private UUID id;
    private String name;
    private String email;
    private String phone;

    private String role;
    private UUID companyId;

    private String companyName;
    private String logoUrl;
}

