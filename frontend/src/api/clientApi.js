const BASE_URL = "http://localhost:8080/api/company";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

// GET ALL
export const getClients = async (companyId) => {
  const res = await fetch(`${BASE_URL}/${companyId}/clients`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
};

// GET BY ID (VIEW / EDIT)
export const getClientById = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/clients/${id}`,
    { headers: authHeader() }
  );
  if (!res.ok) throw new Error("Client not found");
  return res.json();
};

// CREATE
export const createClient = async (companyId, data) => {
  const res = await fetch(`${BASE_URL}/${companyId}/clients`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
};

// UPDATE
export const updateClient = async (companyId, clientId, payload) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/clients/${clientId}`,
    {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) throw new Error("Failed to update client");
  return res.json();
};

// DELETE
export const deleteClient = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/clients/${id}`,
    {
      method: "DELETE",
      headers: authHeader(),
    }
  );
  if (!res.ok) throw new Error("Delete failed");
};



