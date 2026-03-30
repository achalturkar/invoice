export const API_BASE = "http://localhost:8080";

export const getToken = () =>
  localStorage.getItem("accessToken");

export const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});
