import React, { useState } from "react";
import EmployeeSidebar from "../../components/Employee/EmployeeSidebar/EmployeeSidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar/EmployeeNavbar";

const EmployeeLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-gray-100 flex overflow-hidden">

      {/* Sidebar */}
      <EmployeeSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right Content */}
      <div className="flex-1 flex flex-col w-0">

        <EmployeeNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>

      </div>
    </div>
  );
};

export default  EmployeeLayout