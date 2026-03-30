package com.cww.invoice.location.controller;

import com.cww.invoice.location.dto.IdNameDto;
import com.cww.invoice.location.dto.PincodeDto;
import com.cww.invoice.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService service;

    @GetMapping("/countries")
    public List<IdNameDto> countries() {
        return service.getCountries();
    }

    @GetMapping("/states")
    public List<IdNameDto> states(@RequestParam UUID countryId) {
        return service.getStates(countryId);
    }

    @GetMapping("/districts")
    public List<IdNameDto> districts(@RequestParam UUID stateId) {
        return service.getDistricts(stateId);
    }

    @GetMapping("/talukas")
    public List<IdNameDto> talukas(@RequestParam UUID districtId) {
        return service.getTalukas(districtId);
    }

    @GetMapping("/villages")
    public List<IdNameDto> villages(@RequestParam UUID talukaId) {
        return service.getVillages(talukaId);
    }

    @GetMapping("/pincodes")
    public List<PincodeDto> pincodes(@RequestParam UUID villageId) {
        return service.getPincodes(villageId);
    }
}


///api/location/countries
///api/location/states
///api/location/districts
///api/location/talukas
///api/location/pincodes

