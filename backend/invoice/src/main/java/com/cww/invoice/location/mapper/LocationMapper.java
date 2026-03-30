package com.cww.invoice.location.mapper;

import com.cww.invoice.location.dto.IdNameDto;
import com.cww.invoice.location.dto.PincodeDto;
import com.cww.invoice.location.entity.Pincode;

import java.util.UUID;

public class LocationMapper {
    public static IdNameDto toDto(UUID id, String name) {
        return new IdNameDto(id, name);
    }

    public static PincodeDto toPincodeDto(Pincode pincode) {
        return new PincodeDto(pincode.getId(), pincode.getPincode());
    }
}
