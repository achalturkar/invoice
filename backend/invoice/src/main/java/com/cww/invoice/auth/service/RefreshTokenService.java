package com.cww.invoice.auth.service;

import com.cww.invoice.auth.entity.RefreshToken;
import com.cww.invoice.auth.jwt.JwtService;
import com.cww.invoice.auth.repository.RefreshTokenRepository;
import com.cww.invoice.user.entity.User;
import com.cww.invoice.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

//    @Value("${jwt.refresh.expiration}") // e.g. 604800000 (7 days)
//    private long refreshTokenDurationMs;

    private static final long REFRESH_EXP =
            1000L * 60 * 60 * 24 * 30;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    // 🔹 Create & Save Refresh Token
    public RefreshToken createRefreshToken(User user) {

        refreshTokenRepository.deleteByUser(user); // one user = one token

        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(jwtService.generateRefreshToken(user.getEmail()));
        token.setExpiryDate(Instant.now().plusMillis(REFRESH_EXP));

        return refreshTokenRepository.save(token);
    }

    public RefreshToken validateRefreshToken(String tokenStr) {

        RefreshToken token = refreshTokenRepository.findByToken(tokenStr)
                .orElseThrow(() ->
                        new RuntimeException("Refresh token invalid"));

        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired");
        }

        return token;
    }

    // 🔹 Find by token
    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new RuntimeException("Refresh token invalid"));
    }



    @Transactional
    public void deleteByUser(User user) {
        refreshTokenRepository.deleteByUser(user);
    }

    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.findByToken(token)
                .ifPresent(refreshTokenRepository::delete);
    }

}

