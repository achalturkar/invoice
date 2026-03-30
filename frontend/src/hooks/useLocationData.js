import { useEffect, useState } from "react";
import {
  getCountries,
  getStates,
  getDistricts,
  getTalukas,
  getVillages,
  getPincodes,
} from "../api/locationApi";

export const useLocationData = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  // 🔹 Load countries on mount
  useEffect(() => {
    getCountries()
      .then(setCountries)
      .catch(console.error);
  }, []);

  // 🔹 Cascading loaders
  const loadStates = async (countryId) => {
    setStates([]);
    setDistricts([]);
    setTalukas([]);
    setVillages([]);
    setPincodes([]);

    if (!countryId) return;
    setStates(await getStates(countryId));
  };

  const loadDistricts = async (stateId) => {
    setDistricts([]);
    setTalukas([]);
    setVillages([]);
    setPincodes([]);

    if (!stateId) return;
    setDistricts(await getDistricts(stateId));
  };

  const loadTalukas = async (districtId) => {
    setTalukas([]);
    setVillages([]);
    setPincodes([]);

    if (!districtId) return;
    setTalukas(await getTalukas(districtId));
  };

  const loadVillages = async (talukaId) => {
    setVillages([]);
    setPincodes([]);

    if (!talukaId) return;
    setVillages(await getVillages(talukaId));
  };

  const loadPincodes = async (villageId) => {
    setPincodes([]);
    if (!villageId) return;
    setPincodes(await getPincodes(villageId));
  };

  return {
    countries,
    states,
    districts,
    talukas,
    villages,
    pincodes,

    loadStates,
    loadDistricts,
    loadTalukas,
    loadVillages,
    loadPincodes,
  };
};
