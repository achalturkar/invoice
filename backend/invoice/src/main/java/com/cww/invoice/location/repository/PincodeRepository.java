package com.cww.invoice.location.repository;

import com.cww.invoice.location.entity.Pincode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PincodeRepository extends JpaRepository<Pincode, UUID> {
    List<Pincode> findByVillageId(UUID villageId);

}
