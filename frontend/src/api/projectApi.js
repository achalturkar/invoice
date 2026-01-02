const BASE_URL = "http://localhost:8080/api/company";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json"
});

/* ================= PROJECT ================= */

export const getProjects = async (companyId) => {
  const res = await fetch(`${BASE_URL}/${companyId}/projects`, {
    headers: authHeader()
  });
  return res.json();
};

export const getProjectById = async (companyId, id) => {
  const res = await fetch(`${BASE_URL}/${companyId}/projects/${id}`, {
    headers: authHeader()
  });
  return res.json();
};

export const createProject = async (companyId, data) => {
  const res = await fetch(`${BASE_URL}/${companyId}/projects`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateProject = async (companyId, id, data) => {
  const res = await fetch(`${BASE_URL}/${companyId}/projects/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data)
  });
  return res.json();
};
