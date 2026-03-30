import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { SUPER_ADMIN_ROUTES } from "./routes.config";
import { resolveComponent } from "./routeMapper";

const SuperAdminRoutes = () => (
  <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>
    <Route path="/super-admin">
      {SUPER_ADMIN_ROUTES.map(({ path, element }) => {
        const Component = resolveComponent(element);
        return <Route key={path} path={path} element={<Component />} />;
      })}
    </Route>
  </Route>
);

export default SuperAdminRoutes;
