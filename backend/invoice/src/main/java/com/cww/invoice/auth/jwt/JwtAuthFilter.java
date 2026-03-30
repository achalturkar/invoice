//package com.cww.invoice.auth.jwt;
//
//import com.cww.invoice.auth.service.CustomUserDetailService;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//@Component
//public class JwtAuthFilter extends OncePerRequestFilter {
//
//    private final CustomUserDetailService userDetailsService;
//    private final JwtService jwtService;
//
//    public JwtAuthFilter(CustomUserDetailService userDetailsService,
//                         JwtService jwtService) {
//        this.userDetailsService = userDetailsService;
//        this.jwtService = jwtService;
//    }
//
//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain
//    ) throws ServletException, IOException {
//
//        String path = request.getServletPath();
//
//        // ✅ PUBLIC ENDPOINTS
//        if (
//                path.equals("/api/auth/login") ||
//                        path.equals("/api/auth/refresh") ||
//                        path.equals("/api/auth/logout")
//        ) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String authHeader = request.getHeader("Authorization");
//
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = authHeader.substring(7);
//
//        try {
//            String email = jwtService.extractUsername(token);
//
//            UserDetails userDetails =
//                    userDetailsService.loadUserByUsername(email);
//
//            UsernamePasswordAuthenticationToken authentication =
//                    new UsernamePasswordAuthenticationToken(
//                            userDetails,
//                            null,
//                            userDetails.getAuthorities()
//                    );
//
//            SecurityContextHolder.getContext()
//                    .setAuthentication(authentication);
//
//        } catch (Exception e) {
//            // ❌ DO NOT BLOCK HERE
//            SecurityContextHolder.clearContext();
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}

//
//package com.cww.invoice.auth.jwt;
//
//import com.cww.invoice.auth.service.CustomUserDetailService;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//public class JwtAuthFilter extends OncePerRequestFilter {
//
//    private final CustomUserDetailService userDetailsService;
//    private final JwtService jwtService;
//
//    public JwtAuthFilter(CustomUserDetailService userDetailsService,
//                         JwtService jwtService) {
//        this.userDetailsService = userDetailsService;
//        this.jwtService = jwtService;
//    }
//
//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain
//    ) throws ServletException, IOException {
//
//        String path = request.getServletPath();
//
//        // ✅ ONLY truly public APIs
//        if (
//                path.equals("/api/auth/login") ||
//                        path.equals("/api/auth/refresh") ||
//                        path.equals("/api/auth/logout")
//        ) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String authHeader = request.getHeader("Authorization");
//
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token = authHeader.substring(7);
//
//        if (!jwtService.isTokenValid(token)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String email = jwtService.extractUsername(token);
//
//        UserDetails userDetails =
//                userDetailsService.loadUserByUsername(email);
//
//        UsernamePasswordAuthenticationToken authentication =
//                new UsernamePasswordAuthenticationToken(
//                        userDetails,
//                        null,
//                        userDetails.getAuthorities()
//                );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        filterChain.doFilter(request, response);
//    }
//
//}


package com.cww.invoice.auth.jwt;

import com.cww.invoice.auth.service.CustomUserDetailService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailService userDetailsService;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // 🔓 No token → continue
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);

        try {
            // ❌ Invalid / expired token
            if (!jwtService.isTokenValid(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            // ✅ Extract data
            String email = jwtService.extractUsername(token);
            Claims claims = jwtService.extractAllClaims(token);

            String role = claims.get("role", String.class);
            // EXPECTED: ROLE_COMPANY_ADMIN / ROLE_SUPER_ADMIN

            // 🔐 Set authentication ONLY if not already set
//

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,     // 🔥 FULL OBJECT
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }


        } catch (Exception ex) {
            // ❌ DO NOT logout user here
            // ❌ DO NOT clear context
            // Let Spring return 401/403 → frontend refresh will handle
        }

        filterChain.doFilter(request, response);
    }
}
