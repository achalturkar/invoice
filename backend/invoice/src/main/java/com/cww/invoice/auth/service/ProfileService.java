package com.cww.invoice.auth.service;

import com.cww.invoice.auth.dto.UserProfileResponse;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public UserProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserProfileResponse(
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getCompany() != null ? user.getCompany().getName() : "Super Admin",
                user.getRole().name(),
                user.getCompany() != null
                        ? user.getCompany().getId().toString()
                        : null
        );
    }
}

