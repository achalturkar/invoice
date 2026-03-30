// src/api/invoiceApi.js

const BASE_URL = "http://localhost:8080/api/company";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
});

/* ================= CREATE ================= */

export const createInvoice = async (companyId, data) => {
  const res = await fetch(`${BASE_URL}/${companyId}/invoices`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Invoice creation failed");
  return res.json();
};

/* ================= GET ================= */

export const getInvoices = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/invoices`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
};

export const getInvoiceById = async (companyId, invoiceId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/invoices/${invoiceId}`,
    { headers: authHeader() }
  );

  if (!res.ok) throw new Error("Invoice not found");
  return res.json();
};

export const viewInvoice = async (companyId, invoiceId) =>{
    const res = await fetch(
        `${BASE_URL}/${companyId}/invoices/${invoiceId}/view`,
        {headers:authHeader()}
    );
    if(!res.ok) throw new Error("Invoice Not Found");
    return res.blob();
}

export const downloadInvoice= async (companyId, invoiceId) =>{
    const res = await fetch(
        `${BASE_URL}/${companyId}/invoices/${invoiceId}/download`,
        {headers: authHeader()}
    );
    if(!res.ok) throw new Error("Invoice Not found ");
    return res.blob();
}


// ----------------Client Invoice-------------

export const clientAllInvoice = async (
  companyId,
  clientId,
  page = 0,
  size = 2
) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/invoices/${clientId}/invoices?page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error("Invoices not found");

  return res.json(); // ✅ correct
};


/* ================= DELETE ================= */

export const deleteInvoice = async (companyId, invoiceId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/invoices/${invoiceId}`,
    { method: "DELETE", headers: authHeader() }
  );

  if (!res.ok) throw new Error("Delete failed");
};

/* ================= STATUS ================= */

export const updateInvoiceStatus = async (
  companyId,
  invoiceId,
  status
) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/invoices/${invoiceId}/status`,
    {
      method: "PATCH",
      headers: authHeader(),
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) throw new Error("Status update failed");
};

/* ================= EMAIL ================= */

export const emailInvoice = async (companyId, invoiceId) => {
  const res = await fetch(
    `${BASE_URL}/${companyId}/invoices/${invoiceId}/email`,
    { method: "POST", headers: authHeader() }
  );

  if (!res.ok) throw new Error("Email failed");
};
