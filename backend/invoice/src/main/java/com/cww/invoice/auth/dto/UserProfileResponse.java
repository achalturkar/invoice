package com.cww.invoice.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserProfileResponse {
    private String name;
    private String email;
    private String mobile;
    private String companyName;
    private String role;
    private String company;

}
