const BASE_URL = "http://localhost:8080/api/location";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

// ---------- COUNTRY ----------
export const getCountries = async () => {
  const res = await fetch(`${BASE_URL}/countries`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};

// ---------- STATE ----------
export const getStates = async (countryId) => {
  const res = await fetch(
    `${BASE_URL}/states?countryId=${countryId}`,
    { headers: authHeader() }
  );
  if (!res.ok) throw new Error("Failed to fetch states");
  return res.json();
};

// ---------- DISTRICT ----------
export const getDistricts = async (stateId) => {
  const res = await fetch(
    `${BASE_URL}/districts?stateId=${stateId}`,
    { headers: authHeader() }
  );
  if (!res.ok) throw new Error("Failed to fetch districts");
  return res.json();
};

// ---------- TALUKA ----------
export const getTalukas = async (districtId) => {
  const res = await fetch(
    `${BASE_URL}/talukas?districtId=${districtId}`,
    { headers: authHeader() }
  );
  if (!res.ok) throw new Error("Failed to fetch talukas");
  return res.json();
};

// ---------- VILLAGE ----------
export const getVillages = async (talukaId) => {
  const res = await fetch(
    `${BASE_URL}/villages?talukaId=${talukaId}`,
    { headers: authHeader() }
  );
  if (!res.ok) throw new Error("Failed to fetch villages");
  return res.json();
};

// ---------- PINCODE ----------
export const getPincodes = async (villageId) => {
  const res = await fetch(
    `${BASE_URL}/pincodes?villageId=${villageId}`,
    { headers: authHeader() }
  );
  if (!res.ok) throw new Error("Failed to fetch pincodes");
  return res.json();
};
