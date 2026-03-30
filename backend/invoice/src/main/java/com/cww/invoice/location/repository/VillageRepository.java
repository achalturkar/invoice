package com.cww.invoice.location.repository;

import com.cww.invoice.location.entity.Village;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VillageRepository extends JpaRepository<Village, UUID> {
    List<Village> findByTalukaId(UUID talukaId);

}
