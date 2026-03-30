package com.cww.invoice.location.service;

import com.cww.invoice.location.dto.IdNameDto;
import com.cww.invoice.location.dto.PincodeDto;
import com.cww.invoice.location.mapper.LocationMapper;
import com.cww.invoice.location.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final CountryRepository countryRepo;
    private final StateRepository stateRepo;
    private final DistrictRepository districtRepo;
    private final TalukaRepository talukaRepo;
    private final VillageRepository villageRepo;
    private final PincodeRepository pincodeRepo;

    public List<IdNameDto> getCountries() {
        return countryRepo.findAll()
                .stream()
                .map(c -> LocationMapper.toDto(c.getId(), c.getCountryName()))
                .toList();
    }

    public List<IdNameDto> getStates(UUID countryId) {
        return stateRepo.findByCountryId(countryId)
                .stream()
                .map(s -> LocationMapper.toDto(s.getId(), s.getStateName()))
                .toList();
    }

    public List<IdNameDto> getDistricts(UUID stateId) {
        return districtRepo.findByStateId(stateId)
                .stream()
                .map(d -> LocationMapper.toDto(d.getId(), d.getDistrictName()))
                .toList();
    }

    public List<IdNameDto> getTalukas(UUID districtId) {
        return talukaRepo.findByDistrictId(districtId)
                .stream()
                .map(t -> LocationMapper.toDto(t.getId(), t.getTalukaName()))
                .toList();
    }

    public List<IdNameDto> getVillages(UUID talukaId) {
        return villageRepo.findByTalukaId(talukaId)
                .stream()
                .map(v -> LocationMapper.toDto(v.getId(), v.getVillageName()))
                .toList();
    }

    public List<PincodeDto> getPincodes(UUID villageId) {
        return pincodeRepo.findByVillageId(villageId)
                .stream()
                .map(LocationMapper::toPincodeDto)
                .toList();
    }
}
