const BASE_URL = "http://localhost:8080/api/company";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

/* ================= ADD ADDRESS ================= */
export const addClientAddress = async (companyId, clientId, data) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/clients/${clientId}/addresses`,
    {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to add address");
  }

  return res.json();
};

/* ================= ADD Bulk ADDRESSES ================= */

export const addBulkClientAddress = async (companyId, clientId, data) =>{

  const res = await fetch(`${BASE_URL}/${companyId}/clients/${clientId}/addresses/bulk`,
    {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data)
    }
  );

  if(!res.ok){
    const msg = await res.text();
    throw new Error(msg || "Failed to Add Address")
  }
  return res.json();

}





/* ================= GET ALL ADDRESSES ================= */
export const getClientAddresses = async (companyId, clientId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/clients/${clientId}/addresses`,
    {
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
};

/* ================= UPDATE ADDRESS ================= */
export const updateClientAddress = async (
  companyId,
  clientId,
  addressId,
  data
) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/clients/${clientId}/addresses/${addressId}`,
    {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Update failed");
  }

  return res.json();
};

/* ================= DELETE ADDRESS ================= */
export const deleteClientAddress = async (
  companyId,
  clientId,
  addressId
) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/clients/${clientId}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Delete failed");
};
