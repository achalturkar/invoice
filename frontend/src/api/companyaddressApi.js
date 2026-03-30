const BASE_URL = "http://localhost:8080/api/companies";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

// 🔹 GET addresses
export const getCompanyAddresses = async (companyId) => {
  const res = await fetch(`${BASE_URL}/${companyId}/addresses`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
};

// 🔹 CREATE address
export const createCompanyAddress = async (companyId, payload) => {
  const res = await fetch(`${BASE_URL}/${companyId}/addresses`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to create address");
  }

  return res.json();
};


// ✅ GET SINGLE address
export const getCompanyAddressById = async (companyId, addressId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/addresses/${addressId}`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Failed to load address");
  return res.json();
};

// ✅ UPDATE
export const updateCompanyAddress = async (companyId, addressId, payload) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/addresses/${addressId}`,
    {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

// ✅ DELETE
export const deleteCompanyAddress = async (companyId, addressId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Delete failed");
};
