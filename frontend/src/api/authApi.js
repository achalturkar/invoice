// src/api/authApi.js


const baseUrl = "http://localhost:8080/api"
export const getLoggedInUser = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${baseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return await res.json();
};

