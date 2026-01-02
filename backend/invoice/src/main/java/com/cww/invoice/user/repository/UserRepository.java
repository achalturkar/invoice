package com.cww.invoice.user.repository;

import com.cww.invoice.user.entity.Role;
import com.cww.invoice.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String Email);

    boolean existsByRole(Role role);
    boolean existsByEmail(String email);


}

