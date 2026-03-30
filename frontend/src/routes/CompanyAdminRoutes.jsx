import React from "react";

import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { COMPANY_ADMIN_ROUTES } from "./routes.config";
import { resolveComponent } from "./routeMapper";

const CompanyAdminRoutes = () => (
  <Route element={<ProtectedRoute allowedRoles={["COMPANY_ADMIN"]} />}>
    <Route path="/company-admin">
      {COMPANY_ADMIN_ROUTES.map(({ path, element }) => {
        const Component = resolveComponent(element);
        return <Route key={path} path={path} element={<Component />} />;
      })}
    </Route>
  </Route>
);

export default CompanyAdminRoutes;
