const BASE_URL = "http://localhost:8080/api/companies";

/* ============================= */
/* 🔐 AUTH HEADER */
/* ============================= */

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

export const getHolidays = async (companyId, year) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/holidays?year=${year}`,
    { headers: getAuthHeaders() }
  );

  if (!res.ok) throw new Error("Failed to fetch holidays");
  return res.json();
};

export const getAllHolidays = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/holidays/all`,
    { headers: getAuthHeaders() }
  );

  if (!res.ok) throw new Error("Failed to fetch holidays");
  return res.json();
};

export const getUpcomingHolidays = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/holidays/upcoming`,
    { headers: getAuthHeaders() }
  );

  if (!res.ok) throw new Error("Failed to fetch holidays");
  return res.json();
};

export const createHoliday = async (companyId, employeeId, data) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/holidays?userId=${employeeId}`,
    {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to create holiday");
  return res.json();
};

export const deleteHoliday = async (companyId, holidayId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/holidays/${holidayId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!res.ok) throw new Error("Failed to delete holiday");
};

export const toggleHoliday = async (companyId, holidayId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/holidays/${holidayId}/toggle`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!res.ok) throw new Error("Failed to toggle holiday");
};
