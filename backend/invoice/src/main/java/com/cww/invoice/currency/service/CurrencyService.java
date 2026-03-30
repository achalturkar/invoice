package com.cww.invoice.currency.service;

import com.cww.invoice.currency.dto.CurrencyCreateRequestDTO;
import com.cww.invoice.currency.dto.CurrencyResponseDTO;
import com.cww.invoice.currency.entity.Currency;
import com.cww.invoice.currency.mapper.CurrencyMapper;
import com.cww.invoice.currency.repository.CurrencyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private final CurrencyRepository repository;

    @Transactional
    public CurrencyResponseDTO createCurrency(CurrencyCreateRequestDTO dto) {

        // Validate required fields
        if (dto.getCode() == null || dto.getCode().isBlank()) {
            throw new RuntimeException("Currency code is required");
        }

        String code = dto.getCode().toUpperCase().trim();

        //  Prevent duplicate code
        repository.findByCode(code)
                .ifPresent(c -> {
                    throw new RuntimeException("Currency already exists with code: " + code);
                });

        Currency currency = new Currency();
        currency.setCode(code);
        currency.setName(dto.getName());
        currency.setSymbol(dto.getSymbol());
        currency.setDecimalPlaces(
                dto.getDecimalPlaces() != null ? dto.getDecimalPlaces() : 2
        );
        currency.setIsActive(true);

        Boolean isBase = dto.getIsBaseCurrency() != null && dto.getIsBaseCurrency();

        // 3Base currency logic
        if (isBase) {

            // Unset old base currency
            repository.findByIsBaseCurrencyTrue()
                    .ifPresent(existing -> {
                        existing.setIsBaseCurrency(false);
                        repository.save(existing);
                    });

            currency.setIsBaseCurrency(true);
            currency.setExchangeRate(BigDecimal.ONE);

        } else {

            if (dto.getExchangeRate() == null) {
                throw new RuntimeException("Exchange rate required for non-base currency");
            }

            if (dto.getExchangeRate().compareTo(BigDecimal.ZERO) <= 0) {
                throw new RuntimeException("Exchange rate must be greater than zero");
            }

            currency.setIsBaseCurrency(false);
            currency.setExchangeRate(dto.getExchangeRate());
        }

        Currency saved = repository.save(currency);

        return CurrencyMapper.mapToDto(saved);
    }


    public Currency getActiveByCode(String code) {
        return repository.findByCodeAndIsActiveTrue(code)
                .orElseThrow(() -> new RuntimeException("Currency not active or not found"));
    }

    public List<Currency> getAllActive() {
        return repository.findAllByIsActiveTrue();
    }

    public Currency create(Currency currency) {
        if (currency.getIsBaseCurrency()) {
            unsetOldBaseCurrency();
            currency.setExchangeRate(BigDecimal.ONE);
        }
        return repository.save(currency);
    }

    private void unsetOldBaseCurrency() {
        repository.findByIsBaseCurrencyTrue()
                .ifPresent(c -> {
                    c.setIsBaseCurrency(false);
                    repository.save(c);
                });
    }
}
