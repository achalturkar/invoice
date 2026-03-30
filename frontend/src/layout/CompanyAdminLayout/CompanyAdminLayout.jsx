import React, { useState } from "react";
import CompanySidebar from "../../components/CompanyAdmin/CompanySidebar/CompanySidebar";
import CompanyNavbar from "../../components/CompanyAdmin/CompanyNavbar/CompanyNavbar";

const CompanyAdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-gray-100 flex overflow-hidden">

      {/* SIDEBAR */}
      <CompanySidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col w-0">

        {/* NAVBAR */}
        <CompanyNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>

      </div>
    </div>
  );
};


export default CompanyAdminLayout;
