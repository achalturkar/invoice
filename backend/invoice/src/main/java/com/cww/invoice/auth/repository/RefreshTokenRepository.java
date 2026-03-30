package com.cww.invoice.auth.repository;

import com.cww.invoice.auth.entity.RefreshToken;
import com.cww.invoice.user.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RefreshTokenRepository
        extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

//    void deleteByUser(User user);

    @Modifying
    @Transactional
    @Query("delete from RefreshToken r where r.user = :user")
    void deleteByUser(@Param("user") User user);
}
