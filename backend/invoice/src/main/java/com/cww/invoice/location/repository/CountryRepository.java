package com.cww.invoice.location.repository;

import com.cww.invoice.location.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CountryRepository extends JpaRepository<Country, UUID> {
    boolean existsByCountryName(String countryName);

    Optional<Country> findByIsoCode(String code);

}
