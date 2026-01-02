const API = "http://localhost:8080";

export const getBankDetails = async (companyId) => {
  const res = await fetch(`${API}/api/company/${companyId}/bank-details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
};

export const saveBankDetails = async (companyId, data) => {
  const res = await fetch(`${API}/api/company/${companyId}/bank-details`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
