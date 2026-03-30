
// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadUser = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       setAuth(res.data);
//     } catch (err) {
//       if (err.response?.status === 401 || err.response?.status === 403) {
//         return;
//       }
//       setAuth(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//           // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       loadUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // if (loading) return null;

//     const logout = async () => {
//     try {
//       await api.post("/auth/logout");
//     } catch (err) {
//       console.warn("Logout API failed");
//     } finally {
//       localStorage.removeItem("accessToken");
//       setAuth(null);
//       window.location.replace("/");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ auth, setAuth, loadUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setAuth(res.data);
      return res.data;
    } catch (err) {
      setAuth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout failed");
    } finally {
      localStorage.removeItem("accessToken");
      setAuth(null);
      window.location.replace("/");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loadUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
