import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();

  if (!auth.accessToken) return <Navigate to="/" replace />;

  return allowedRoles.includes(auth.role)
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
};

export default RoleRoute;
