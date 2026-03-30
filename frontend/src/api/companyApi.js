// src/api/companyApi.js

const BASE_URL = "http://localhost:8080/api";


export const getCompanyById = async (companyId) => {
  const res = await fetch(`${BASE_URL}/company/${companyId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.json();
};

export const updateCompanyById = async (companyId, data) => {
  const res = await fetch(`${BASE_URL}/company/${companyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const uploadCompanyImage = async (companyId, type, file) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("file", file);

  const res = await fetch(
    `${BASE_URL}/company/${companyId}/upload-image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Image upload failed");
  return res.json(); 
};


export const getCompanyLogo = async (companyId) => {
  const res = await fetch(
    `${BASE_URL}/company/${companyId}/image/logo`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch logo");
  }

  return res.blob(); // ✅ blob return karo
};

