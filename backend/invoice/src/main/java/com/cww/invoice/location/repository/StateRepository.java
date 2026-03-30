package com.cww.invoice.location.repository;

import com.cww.invoice.location.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StateRepository extends JpaRepository<State, UUID> {

    List<State> findByCountryId(UUID countryId);


}
