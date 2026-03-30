
const BASE_URL = "http://localhost:8080/api/companies";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json"
});

export const createLeavePolicy = async (companyId, data) => {
  const res = await fetch(`${BASE_URL}/${companyId}/leave-policies`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Something went wrong");
  }

  return res.json();
};

export const getLeavePolicy = async (companyId) => {
  const res = await fetch(`${BASE_URL}/${companyId}/leave-policies`, {
    headers: authHeaders(),
  });
  return res.json();
};

export const getLeavePolicyId = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/leave-policies/${id}`,
    { headers: authHeaders() }
  );
  return res.json();
};

export const updateLeavePolicy = async (policyId, companyId , data) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/leave-policies/${policyId}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to update Leave Policy");
  return res.json();
};

export const deleteLeavePolicy = async (policyId, companyId) =>{
    const res = await fetch(`${BASE_URL}/${companyId}/leave-policies/${policyId}`,
        {
            method: "Delete",
            headers : authHeaders(),
        }
    );
      if (!res.ok) throw new Error("Failed to delete leavePolicies");

}