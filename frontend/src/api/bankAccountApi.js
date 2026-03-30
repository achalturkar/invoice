// const BASE_URL = "http://localhost:8080/api";

// const authHeader = () => ({
//   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//   "Content-Type": "application/json",
// });

// /* ================================
//    CREATE BANK ACCOUNT
// ================================ */
// export const createBankAccount = async (companyId, data) => {
//   const res = await fetch(
//     `${BASE_URL}/companies/${companyId}/bank-accounts`,
//     {
//       method: "POST",
//       headers: authHeader(),
//       body: JSON.stringify(data),
//     }
//   );

//   if (!res.ok) throw new Error("Failed to create bank account");
//   return res.json();
// };

// /* ================================
//    GET ALL BANK ACCOUNTS (LIST)
// ================================ */
// export const getBankAccounts = async (companyId) => {
//   const res = await fetch(
//     `${BASE_URL}/companies/${companyId}/bank-accounts`,
//     {
//       headers: authHeader(),
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch bank accounts");
//   return res.json();
// };

// /* ================================
//    GET ACTIVE BANK ACCOUNTS (DROPDOWN)
// ================================ */
// export const getActiveBankAccounts = async (companyId) => {
//   const res = await fetch(
//     `${BASE_URL}/companies/${companyId}/bank-accounts/active`,
//     {
//       headers: authHeader(),
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch active bank accounts");
//   return res.json();
// };

// /* GET BY ID */
// export const getBankAccountById = async (companyId, bankAccountId) => {
//   const res = await fetch(
//     `${BASE_URL}/companies/${companyId}/bank-accounts/${bankAccountId}`,
//     { headers: authHeader() }
//   );

//   if (!res.ok) throw new Error("Bank account not found");
//   return res.json();
// };

// /* UPDATE */
// export const updateBankAccount = async (companyId, bankAccountId, data) => {
//   const res = await fetch(
//     `${BASE_URL}/companies/${companyId}/bank-accounts/${bankAccountId}`,
//     {
//       method: "PUT",
//       headers: authHeader(),
//       body: JSON.stringify(data),
//     }
//   );

//   if (!res.ok) throw new Error("Failed to update bank account");
//   return res.json();
// };

// /* ================================
//    UPDATE BANK ACCOUNT STATUS
//    ACTIVE | INACTIVE | CLOSED
// ================================ */
// export const updateBankAccountStatus = async (
//   companyId,
//   bankAccountId,
//   status
// ) => {
//   const res = await fetch(
//     `${BASE_URL}/companies/${companyId}/bank-accounts/${bankAccountId}/status?status=${status}`,
//     {
//       method: "PATCH",
//       headers: authHeader(),
//     }
//   );

//   if (!res.ok) throw new Error("Failed to update status");
// };

// /* ================================
//    DELETE BANK ACCOUNT
// ================================ */
// export const deleteBankAccount = async (companyId, bankAccountId) => {
//   const res = await fetch(
//     `${BASE_URL}/companies/${companyId}/bank-accounts/${bankAccountId}`,
//     {
//       method: "DELETE",
//       headers: authHeader(),
//     }
//   );

//   if (!res.ok) throw new Error("Failed to delete bank account");
// };

const BASE_URL = "http://localhost:8080/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

/* ================= CREATE ================= */
export const createBankAccount = async (companyId, data) => {
  const res = await fetch(
    `${BASE_URL}/companies/${companyId}/bank-accounts`,
    {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to create bank account");
  return res.json();
};

/* ================= LIST ================= */
export const getBankAccounts = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/companies/${companyId}/bank-accounts`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Failed to fetch bank accounts");
  return res.json();
};

/* ================= GET BY ID ================= */
export const getBankAccountById = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/companies/${companyId}/bank-accounts/${id}`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Bank account not found");
  return res.json();
};

/* ================= UPDATE ================= */
export const updateBankAccount = async (companyId, id, data) => {
  const res = await fetch(
    `${BASE_URL}/companies/${companyId}/bank-accounts/${id}`,
    {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to update bank account");
  return res.json();
};

/* ================= STATUS ================= */
export const updateBankAccountStatus = async (
  companyId,
  id,
  status
) => {
  const res = await fetch(
    `${BASE_URL}/companies/${companyId}/bank-accounts/${id}/status?status=${status}`,
    {
      method: "PATCH",
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Failed to update status");
};

/* ================= DELETE ================= */
export const deleteBankAccount = async (companyId, id) => {
  const res = await fetch(
    `${BASE_URL}/companies/${companyId}/bank-accounts/${id}`,
    {
      method: "DELETE",
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Failed to delete bank account");
};




/* ================================
   GET ACTIVE BANK ACCOUNTS (DROPDOWN)
================================ */
export const getActiveBankAccounts = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/companies/${companyId}/bank-accounts/active`,
    {
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Failed to fetch active bank accounts");
  return res.json();
};