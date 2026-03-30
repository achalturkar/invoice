import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const PublicRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) return null; // or loader

  // If user already logged in → redirect
  if (auth) {
    if (auth.role === "SUPER_ADMIN") {
      return <Navigate to="/super-admin/dashboard" replace />;
    }
    if (auth.role === "COMPANY_ADMIN") {
      return <Navigate to="/company-admin/dashboard" replace />;
    }
    if (auth.role === "EMPLOYEE" || auth.role === "HR") {
      return <Navigate to="/employee/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
