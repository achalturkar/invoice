// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
//   withCredentials: true
// });

// // REQUEST
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//   // ❌ DO NOT attach token for refresh
//   if (token && !config.url.includes("/auth/refresh")) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // RESPONSE
// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;

//     // ❌ NEVER retry refresh endpoint
//     if (originalRequest.url.includes("/auth/refresh")) {
//       return Promise.reject(err);
//     }

//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await api.post("/auth/refresh");
//         const newToken = res.data.accessToken;

//         localStorage.setItem("accessToken", newToken);
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;

//         return api(originalRequest);
//       } catch {
//         localStorage.clear();
//         window.location.href = "/";
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true // refresh token cookie
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh logic
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ONLY on access token expiry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");

        const newToken = res.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        // 🔴 Refresh token expired → REAL logout
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
