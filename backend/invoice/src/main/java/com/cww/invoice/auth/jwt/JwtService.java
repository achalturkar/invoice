//package com.cww.invoice.auth.jwt;
//
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.UUID;
//import java.util.function.Function;
//@Component
//public class JwtService {
//
//    private static final String SECRET =
//            "my-super-secret-key-my-super-secret-key-123456";
//
//    private static final long ACCESS_EXP = 1000 * 60 * 60 * 15;
//    private static final long REFRESH_EXP = 1000 * 60 * 60 * 24 * 30;
//
//    private Key getSignKey() {
//        return Keys.hmacShaKeyFor(SECRET.getBytes());
//    }
//
//    public String generateAccessToken(String email, String role, UUID companyId) {
//        return Jwts.builder()
//                .setSubject(email)
//                .claim("role", role)
//                .claim("companyId", companyId)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXP))
//                .signWith(getSignKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public String generateRefreshToken(String email) {
//        return Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXP))
//                .signWith(getSignKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//
//
//    public boolean isTokenValid(String token) {
//        try {
//            parseToken(token);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }
//
//    public String extractUsername(String token) {
//        return parseToken(token).getSubject();
//    }
//
//    private Claims parseToken(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(getSignKey())
//                .setAllowedClockSkewSeconds(30)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//}
//


package com.cww.invoice.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.UUID;


@Component
public class JwtService {

    private static final String SECRET =
            "my-super-secret-key-my-super-secret-key-123456";

    //  15 MIN ACCESS TOKEN
    private static final long ACCESS_EXP = 1000L * 60 * 60 *15;

    //  30 DAYS REFRESH TOKEN
    private static final long REFRESH_EXP = 1000L * 60 * 60 * 24 * 30;

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // ✅ ACCESS TOKEN
    public String generateAccessToken(String email, String role, UUID companyId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", "ROLE_" + role)
                .claim("companyId", companyId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_EXP))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ REFRESH TOKEN (JWT ONLY)
    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_EXP))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .setAllowedClockSkewSeconds(60)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

