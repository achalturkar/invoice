import React from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

const CompanyAdminDashboard = () => {
  return (
    <CompanyAdminLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          Total Clients
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          Active Candidates
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          Pending Invoices
        </div>
      </div>
    </CompanyAdminLayout>
  );
};

export default CompanyAdminDashboard;
