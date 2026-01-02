import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token || token === "undefined") {
    return <Navigate to="/" replace />;
  }

  // ❌ Logged in but role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Access granted
  return <Outlet />;
};

export default ProtectedRoute;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { auth, loading } = useAuth();

//   // ⏳ wait until auth init (/auth/me + refresh if needed)
//   if (loading) return null; // or loader component

//   // ❌ Not logged in
//   if (!auth.accessToken) {
//     return <Navigate to="/" replace />;
//   }

//   // ❌ Role not allowed
//   if (
//     allowedRoles &&
//     !allowedRoles.includes(auth.role)
//   ) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // ✅ Access granted
//   return <Outlet />;
// };

// export default ProtectedRoute;



