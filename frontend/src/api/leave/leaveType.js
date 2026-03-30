const BASE_URL = "http://localhost:8080/api/companies";



const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json"
});

export const createLeaveType = async (companyId, data) => {
  const res = await fetch(`${BASE_URL}/${companyId}/leave-types`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Something went wrong");
  }

  return res.json();
};

export const getLeaveTypes = async (companyId) => {
  const res = await fetch(`${BASE_URL}/${companyId}/leave-types`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const getLeaveTypeById = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/leave-types/${id}`,
    { headers: getAuthHeaders() }
  );
  return res.json();
};



export const updateLeaveType = async (companyId, id, data) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/leave-types/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return res.json();
};

export const deleteLeaveType = async (companyId, id) => {
  return fetch(`${BASE_URL}/${companyId}/leave-types/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};
