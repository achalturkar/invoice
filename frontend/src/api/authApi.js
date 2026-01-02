// src/api/authApi.js
export const getLoggedInUser = async () => {
  const res = await fetch("http://localhost:8080/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};
