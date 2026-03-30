package com.cww.invoice.location.controller;

import com.cww.invoice.location.entity.Country;
import com.cww.invoice.location.service.AdminLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/super-admin/location")
@RequiredArgsConstructor
public class AdminLocationController {

    private final AdminLocationService service;

    @PostMapping("/country")
    public Country addCountry(@RequestParam String name,
                              @RequestParam String code) {
        return service.addCountry(name, code);
    }



    @PostMapping("/upload/country")
    public ResponseEntity<String> uploadCountries(
            @RequestParam("file") MultipartFile file) {

        service.countryUpload(file);
        return ResponseEntity.ok("Country CSV uploaded successfully");
    }

    @PostMapping("/upload/states")
    public ResponseEntity<String> uploadStates(@RequestParam("file") MultipartFile file) {
        service.uploadStates(file);
        return ResponseEntity.ok("States uploaded successfully");
    }

    @PostMapping("/upload/districts")
    public ResponseEntity<String> uploadDistricts(@RequestParam("file") MultipartFile file) {
        service.uploadDistricts(file);
        return ResponseEntity.ok("Districts uploaded successfully");
    }

    @PostMapping("/upload/talukas")
    public ResponseEntity<String> uploadTaluka(@RequestParam("file") MultipartFile file){
        service.uploadTaluka(file);
        return  ResponseEntity.ok("Talukas Uploaded successfully");
    }
}


///api/admin/location/upload
///api/admin/location/state
///api/admin/location/pincode

