package com.cww.invoice.auth.controller;

import com.cww.invoice.auth.dto.*;
import com.cww.invoice.auth.jwt.JwtService;
import com.cww.invoice.auth.service.ProfileService;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ProfileService profileService;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ ACCESS TOKEN
        String accessToken = jwtService.generateAccessToken(
                user.getEmail(),
                user.getRole().name(),
                user.getCompany() != null ? user.getCompany().getId() : null
        );

        // ✅ REFRESH TOKEN
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        // ✅ HttpOnly Cookie
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(false) // true in PROD (HTTPS)
                .path("/")
                .maxAge(60 * 60 * 24 * 30)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new LoginResponse(
                accessToken,
                user.getRole().name(),
                user.getCompany() != null
                        ? user.getCompany().getId().toString()
                        : null
        );
    }

    @PostMapping("/refresh")
    public LoginResponse refreshToken(
            @CookieValue(value = "refresh_token", required = false)
            String refreshToken
    ) {
        if (refreshToken == null || !jwtService.isTokenValid(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String email = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByEmail(email).orElseThrow();

        String newAccessToken = jwtService.generateAccessToken(
                user.getEmail(),
                user.getRole().name(),
                user.getCompany() != null ? user.getCompany().getId() : null
        );

        return new LoginResponse(
                newAccessToken,
                user.getRole().name(),
                user.getCompany() != null
                        ? user.getCompany().getId().toString()
                        : null
        );
    }





    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        System.out.println("Logout Success");
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getLoggedInUser(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.substring(7);
        String email = jwtService.extractUsername(token);

        return ResponseEntity.ok(profileService.getProfile(email));
    }



}
