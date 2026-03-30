package com.cww.invoice.auth.service;

import com.cww.invoice.company.entity.CompanyStatus;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {


    private  final UserRepository userRepository;

//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//
//        User user = userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User Not Found "+ email));
//
//
//        if (user.getCompany() != null &&
//                user.getCompany().getStatus() == CompanyStatus.INACTIVE) {
//
//            throw new DisabledException(
//                    "Company is inactive. Contact Super Admin.");
//        }
//
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getEmail(),
//                user.getPassword(),
//                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
//        );
//
//    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found " + email));

        if (user.getCompany() != null &&
                user.getCompany().getStatus() == CompanyStatus.INACTIVE) {

            throw new DisabledException(
                    "Company is inactive. Contact Super Admin.");
        }

        return user;   // 🔥 VERY IMPORTANT
    }

}
