package com.cww.invoice.companyadmin.service;


import com.cww.invoice.company.repository.CompanyRepository;
import com.cww.invoice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyAdminService {

    private final CompanyRepository companyRepository;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;






}
