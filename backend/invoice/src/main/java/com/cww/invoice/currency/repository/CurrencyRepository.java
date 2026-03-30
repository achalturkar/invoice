package com.cww.invoice.currency.repository;

import com.cww.invoice.currency.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CurrencyRepository extends JpaRepository<Currency, UUID> {

    Optional<Currency> findByCode(String code);

    Optional<Currency> findByCodeAndIsActiveTrue(String code);

    List<Currency> findAllByIsActiveTrue();

    Optional<Currency> findByIsBaseCurrencyTrue();
}

