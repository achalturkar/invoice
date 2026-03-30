package com.cww.invoice.location.repository;

import com.cww.invoice.location.entity.Taluka;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TalukaRepository extends JpaRepository<Taluka, UUID> {
    List<Taluka> findByDistrictId(UUID districtId);

}
