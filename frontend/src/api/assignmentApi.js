const BASE_URL = "http://localhost:8080/api/company";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json"
});

/* ================= ASSIGN ================= */

export const assignCandidateToProject = async (companyId, data) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/project-assignments`,
    {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data)
    }
  );
  if (!res.ok) throw new Error("Assignment failed");
};

/* ================= FETCH ================= */

export const getCandidatesOfProject = async (projectId) => {
  const res = await fetch(
    `http://localhost:8080/api/projects/${projectId}/candidates`,
    { headers: authHeader() }
  );
  return res.json();
};

export const getProjectsOfCandidate = async (candidateId) => {
  const res = await fetch(
    `http://localhost:8080/api/candidates/${candidateId}/projects`,
    { headers: authHeader() }
  );
  return res.json();
};
