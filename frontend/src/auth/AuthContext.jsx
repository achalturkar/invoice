
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // 👈 MUST be null initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔐 Load auth ONLY ONCE
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const companyId = localStorage.getItem("companyId");

    setAuth({
      accessToken,
      role,
      companyId,
    });

    setLoading(false);
  }, []);

  // ⏳ Prevent rendering before auth init
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
