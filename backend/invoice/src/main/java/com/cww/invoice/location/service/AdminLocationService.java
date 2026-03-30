package com.cww.invoice.location.service;

import com.cww.invoice.location.entity.Country;
import com.cww.invoice.location.entity.District;
import com.cww.invoice.location.entity.State;
import com.cww.invoice.location.entity.Taluka;
import com.cww.invoice.location.repository.CountryRepository;
import com.cww.invoice.location.repository.DistrictRepository;
import com.cww.invoice.location.repository.StateRepository;
import com.cww.invoice.location.repository.TalukaRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminLocationService {

    private final CountryRepository countryRepo;
    private final StateRepository stateRepo;
    private final DistrictRepository districtRepo;
    private final TalukaRepository talukaRepo;


    public void countryUpload(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("CSV file is empty");
        }

        List<Country> countries = new ArrayList<>();

        try (
                Reader reader = new InputStreamReader(file.getInputStream());
                CSVParser csvParser = new CSVParser(
                        reader,
                        CSVFormat.DEFAULT
                                .withFirstRecordAsHeader()
                                .withIgnoreHeaderCase()
                                .withTrim()
                )
        ) {
            for (CSVRecord record : csvParser) {

                Country country = new Country();
                country.setCountryName(record.get("country_name"));
                country.setIsoCode(record.get("country_code"));

                countries.add(country);
            }

            countryRepo.saveAll(countries);

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload CSV: " + e.getMessage());
        }
    }

    // ================== STATE CSV UPLOAD ==================
    public void uploadStates(MultipartFile file) {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(file.getInputStream()))) {

            String line;
            br.readLine(); // skip header

            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");

                String stateName = data[0].trim();
                String stateCode = data[1].trim();
                String gstStateCode = data[2].trim();
                String countryCode = data[3].trim();

                Country country = countryRepo.findByIsoCode(countryCode)
                        .orElseThrow(() -> new RuntimeException(
                                "Country not found: " + countryCode));

                boolean exists = stateRepo
                        .findByCountryId(country.getId())
                        .stream()
                        .anyMatch(s -> s.getStateName().equalsIgnoreCase(stateName));

                if (!exists) {
                    State state = new State();
                    state.setStateName(stateName);
                    state.setCountry(country);
                    state.setStateCode(stateCode);
                    state.setGstStateCode(gstStateCode);
                    stateRepo.save(state);
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("State CSV upload failed", e);
        }
    }

    // ================== DISTRICT CSV UPLOAD ==================
    public void uploadDistricts(MultipartFile file) {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(file.getInputStream())))
        {

            String line;
            br.readLine(); // skip header

            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");

                String districtName = data[0].trim();
                String stateName = data[1].trim();

                State state = stateRepo.findAll()
                        .stream()
                        .filter(s -> s.getStateName().equalsIgnoreCase(stateName))
                        .findFirst()
                        .orElseThrow(() ->
                                new RuntimeException("State not found: " + stateName));

                boolean exists = districtRepo
                        .findByStateId(state.getId())
                        .stream()
                        .anyMatch(d -> d.getDistrictName().equalsIgnoreCase(districtName));

                if (!exists) {
                    District district = new District();
                    district.setDistrictName(districtName);
                    district.setState(state);
                    districtRepo.save(district);
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("District CSV upload failed", e);
        }
    }


    public void uploadTaluka(MultipartFile file){
        try(BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream())))
        {
            String line;
            br.readLine();

            while((line= br.readLine())!=null){
                String[] data = line.split(",");
                String districtName = data[0].trim();
                String talukaName = data[1].trim();


                District district = districtRepo.findAll()
                        .stream()
                        .filter(d -> d.getDistrictName().equalsIgnoreCase(districtName))
                        .findFirst()
                        .orElseThrow(()-> new RuntimeException("District not Found "+ districtName));

                boolean exist = talukaRepo.findByDistrictId(district.getId())
                        .stream()
                        .anyMatch(t -> t.getTalukaName().equalsIgnoreCase(talukaName));

                if(!exist){
                    Taluka  taluka = new Taluka();
                    taluka.setTalukaName(talukaName);
                    taluka.setDistrict(district);
                    talukaRepo.save(taluka);
                }

            }

        }catch(Exception e){
             throw new RuntimeException("Taluka CSV upload failed", e);
        }
    }


    public Country addCountry(String name, String code) {
        if (countryRepo.existsByCountryName(name)) {
            throw new RuntimeException("Country already exists");
        }
        return countryRepo.save(new Country(null, name, code));
    }


}

