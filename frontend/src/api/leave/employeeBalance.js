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

/* ========================================================= */
/* ✅ 1. CREATE EMPLOYEE BALANCE */
/* ========================================================= */

export const createEmployeeBalance = async (
  companyId,
  userId,
  leaveTypeId,
  year
) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/users/${userId}/leave-balances`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        leaveTypeId,
        year
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create leave balance");
  }

  return response.json();
};

/* ========================================================= */
/* ✅ 2. GET ALL BALANCES (YEAR WISE) */
/* ========================================================= */

export const getAllEmployeeBalances = async (
  companyId,
  userId,
  year
) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/users/${userId}/leave-balances/${year}`,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch balances");
  }

  return response.json();
};

/* ========================================================= */
/* ✅ 3. GET SINGLE BALANCE */
/* ========================================================= */

export const getEmployeeBalance = async (
  companyId,
  userId,
  leaveTypeId,
  year
) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/users/${userId}/leave-balances/${leaveTypeId}/${year}`,
    {
      method: "GET",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch balance");
  }

  return response.json();
};

/* ========================================================= */
/* ✅ 4. DEDUCT LEAVE */
/* ========================================================= */

export const deductLeave = async (
  companyId,
  userId,
  leaveTypeId,
  year,
  days
) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/users/${userId}/leave-balances/${leaveTypeId}/deduct`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        year,
        days
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to deduct leave");
  }

  return response.json();
};

/* ========================================================= */
/* ✅ 5. RESTORE LEAVE */
/* ========================================================= */

export const restoreLeave = async (
  companyId,
  userId,
  leaveTypeId,
  year,
  days
) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/users/${userId}/leave-balances/${leaveTypeId}/restore`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        year,
        days
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to restore leave");
  }
};

/* ========================================================= */
/* ✅ 6. UPDATE BALANCE */
/* ========================================================= */

export const updateEmployeeBalance = async (
  companyId,
  userId,
  balanceId,
  openingBalance,
  carryForwardDays,
  lapsedDays
) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/users/${userId}/leave-balances/${balanceId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        openingBalance,
        carryForwardDays,
        lapsedDays
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update balance");
  }

  return response.json();
};

/* ========================================================= */
/* ✅ 7. DELETE BALANCE */
/* ========================================================= */

export const deleteEmployeeBalance = async (
  companyId,
  userId,
  balanceId
) => {
  const response = await fetch(
    `${BASE_URL}/${companyId}/users/${userId}/leave-balances/${balanceId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders()
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete balance");
  }
};
