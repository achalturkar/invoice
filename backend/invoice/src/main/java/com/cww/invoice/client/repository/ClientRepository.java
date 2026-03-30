package com.cww.invoice.client.repository;

import com.cww.invoice.client.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {
    List<Client> findByCompanyId(UUID companyId);

    long countByCompanyId(UUID companyId);

    Optional<Client> findByIdAndCompanyId(UUID id, UUID companyId);


}
