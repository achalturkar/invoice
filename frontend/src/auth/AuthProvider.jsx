// import { useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import api from "../api/axios";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load user on app start
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const res = await api.get("/auth/me");
//         setUser(res.data);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadUser();
//   }, []);

//   const login = async (email, password) => {
//     const res = await api.post("/auth/login", { email, password });
//     localStorage.setItem("accessToken", res.data.accessToken);

//     const profile = await api.get("/auth/me");
//     setUser(profile.data);
//   };

//   const logout = async () => {
//     await api.post("/auth/logout");
//     localStorage.removeItem("accessToken");
//     setUser(null);
//     window.location.href = "/login";
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, loading }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
