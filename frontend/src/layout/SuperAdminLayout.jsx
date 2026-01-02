import React, { useState } from "react";
import SuperAdminSidebar from "../components/SuperAdmin/Sidebar/SuperAdminSidebar";
import SuperAdminNavbar from "../components/SuperAdmin/Navabar/SuperAdminNavbar";


const SuperAdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <SuperAdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
