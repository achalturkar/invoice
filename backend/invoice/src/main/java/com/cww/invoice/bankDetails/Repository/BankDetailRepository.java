package com.cww.invoice.bankDetails.Repository;

import com.cww.invoice.bankDetails.entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BankDetailRepository extends JpaRepository<BankDetails, UUID> {

    Optional<BankDetails> findByCompanyId(UUID companyId);

}
