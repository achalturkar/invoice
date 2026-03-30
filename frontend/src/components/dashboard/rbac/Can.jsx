import React from "react";
const Can = ({ permission, children }) => {
  // TEMP: static permissions (API aane ke baad JWT se ayega)
  const permissions = [
    "INVOICE_VIEW",
    "INVOICE_CREATE",
    "DASHBOARD_VIEW"
  ];

  if (!permissions.includes(permission)) return null;
  return children;
};

export default Can;
