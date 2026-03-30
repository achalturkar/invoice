package com.cww.invoice.auth.controller;

import com.cww.invoice.auth.dto.*;
import com.cww.invoice.auth.entity.RefreshToken;
import com.cww.invoice.auth.jwt.JwtService;
import com.cww.invoice.auth.repository.RefreshTokenRepository;
import com.cww.invoice.auth.service.ProfileService;
import com.cww.invoice.auth.service.RefreshTokenService;
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
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;


    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        String accessToken = jwtService.generateAccessToken(
                user.getEmail(),
                user.getRole().name(),
                user.getCompany() != null ? user.getCompany().getId() : null

        );

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);

        ResponseCookie cookie = ResponseCookie.from(
                        "refresh_token",
                        refreshToken.getToken()
                )
                .httpOnly(true)
                .secure(false) // true in prod
                .sameSite("Lax")
                .path("/")
                .maxAge(60L * 60 * 24 * 30)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new LoginResponse(
                accessToken,
                user.getRole().name(),
                user.getCompany() != null
                        ? user.getCompany().getId().toString()
                        : null,
                user.getId()
        );
    }

    @PostMapping("/refresh")
    public LoginResponse refresh(
            @CookieValue(value = "refresh_token", required = false)
            String refreshToken
    ) {
        if (refreshToken == null) {
            throw new RuntimeException("Refresh token missing");
        }

        RefreshToken token =
                refreshTokenService.validateRefreshToken(refreshToken);

        User user = token.getUser();

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
                        : null,
                user.getId()
        );
    }





    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(value = "refresh_token", required = false) String token,
            HttpServletResponse response
    ) {
        if (token != null) {
            refreshTokenService.deleteByToken(token); // ✅ transactional
        }

        ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }


    @GetMapping("/me")
    public ResponseEntity<MeResponse> getMe(Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow();

        return ResponseEntity.ok(
                MeResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .role(user.getRole().name())
                        .companyId(
                                user.getCompany() != null ? user.getCompany().getId() : null
                        )
                        .companyName(
                                user.getCompany() != null ? user.getCompany().getName() : "Super Admin"
                        )
                        .logoUrl(user.getCompany() != null ? user.getCompany().getLogoPath() : " Logo")
                        .build()
        );
    }
}


//    @PostMapping("/login")
//    public LoginResponse login(
//            @RequestBody LoginRequest request,
//            HttpServletResponse response
//    ) {
//
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//
//        User user = userRepository.findByEmail(request.getEmail())
//                .orElseThrow();
//
//        String accessToken = jwtService.generateAccessToken(
//                user.getEmail(),
//                user.getRole().name(),
//                user.getCompany() != null ? user.getCompany().getId() : null
//        );
//
//        String refreshToken = jwtService.generateRefreshToken(user.getEmail());
//
//        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
//                .httpOnly(true)
//                .secure(false) // true in prod
//                .path("/")
//                .sameSite("Lax")
//                .maxAge(60L * 60 * 24 * 30)
//                .build();
//
//        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//
//        return new LoginResponse(
//                accessToken,
//                user.getRole().name(),
//                user.getCompany() != null
//                        ? user.getCompany().getId().toString()
//                        : null
//        );
//    }




