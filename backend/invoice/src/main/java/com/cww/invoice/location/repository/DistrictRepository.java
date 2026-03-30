package com.cww.invoice.location.repository;

import com.cww.invoice.location.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DistrictRepository extends JpaRepository<District, UUID> {
    List<District> findByStateId(UUID stateId);


}
