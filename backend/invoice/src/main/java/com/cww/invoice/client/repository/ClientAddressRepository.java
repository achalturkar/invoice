package com.cww.invoice.client.repository;

import com.cww.invoice.client.entity.AddressType;
import com.cww.invoice.client.entity.ClientAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientAddressRepository extends JpaRepository<ClientAddress, UUID> {

    List<ClientAddress> findByClientId(UUID clientId);

   Optional<ClientAddress> findByIdAndClientId(UUID addressId, UUID clientId);



    ClientAddress findByClientIdAndIsPrimaryTrue(UUID clientId);


    List<ClientAddress> findByClientIdAndAddressType(
            UUID clientId,
            AddressType addressType
    );

    ClientAddress findByClientIdAndAddressTypeAndIsPrimaryTrue(
            UUID clientId,
            AddressType addressType
    );


}
