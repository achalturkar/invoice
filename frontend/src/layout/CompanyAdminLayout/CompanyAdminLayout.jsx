import React, { useState } from "react";
import CompanySidebar from "../../components/CompanyAdmin/CompanySidebar/CompanySidebar";
import CompanyNavbar from "../../components/CompanyAdmin/CompanyNavbar/CompanyNavbar";


const CompanyAdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <CompanySidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <CompanyNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CompanyAdminLayout;
