package com.cww.invoice.bankAccount.Repository;

import com.cww.invoice.bankAccount.entity.BankAccount;
import com.cww.invoice.bankAccount.entity.BankAccountStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BankAccountRepository extends JpaRepository<BankAccount, UUID> {

    List<BankAccount> findAllByCompanyId(UUID companyId);

    List<BankAccount> findAllByCompanyIdAndStatus(
            UUID companyId,
            BankAccountStatus status
    );
}
