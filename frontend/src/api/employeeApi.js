const BASE_URL = "http://localhost:8080/api/companies";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

/* ================= CANDIDATES ================= */

// GET ALL
export const getCandidates = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/employee`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Failed to fetch candidates");
  return res.json();
};

// GET BY ID
export const getCandidateById = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/employee/${id}`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Candidate not found");
  return res.json();
};
// GET BY UserID
export const getCandidateByUserId = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/employee/user/${id}`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Candidate not found");
  return res.json();
};

// CREATE
export const createCandidate = async (companyId, data) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/employee`,
    {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Create candidate failed");
  return res.json();
};

// UPDATE
export const updateCandidate = async (companyId, id, data) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/employee/${id}`,
    {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Update candidate failed");
  return res.json();
};

// DELETE (Deactivate)
export const deleteCandidate = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/employee/${id}`,
    {
      method: "DELETE",
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Delete candidate failed");
};

/* ================= DOCUMENTS ================= */

export const uploadCandidateDocument = async (
  companyId,
  candidateId,
  type,
  file
) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("file", file);

  const res = await fetch(
    `${BASE_URL}/${companyId}/employee/${candidateId}/documents`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};

export const getCandidateDocuments = async (companyId, candidateId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/employee/${candidateId}/documents`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
};
