// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BASE_URL = "http://localhost:8080/api/companies";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});
/* ================= DASHBOARD ================= */

export const getDashboardSummary = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/dashboard/summary`,
    {
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch dashboard summary");
  return res.json();
};
