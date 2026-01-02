package com.cww.invoice.bootstrap;

import com.cww.invoice.user.entity.Role;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SuperAdminBootstrap {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${superadmin.email}")
    private String email;

    @Value("${superadmin.password}")
    private String password;

    @PostConstruct
    public void createSuperAdmin() {

        boolean exists = userRepository
                .existsByRole(Role.SUPER_ADMIN);

        if (!exists) {
            User user = new User();
            user.setName("System Super Admin");
            user.setEmail(email);
            user.setPhone("9359647748");
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(Role.SUPER_ADMIN);
            user.setCompany(null);

            userRepository.save(user);

            System.out.println("✅ SUPER ADMIN CREATED");
        }
    }
}
