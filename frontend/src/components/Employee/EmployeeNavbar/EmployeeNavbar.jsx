import React from "react";
import { Menu, Bell } from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";
import ProfileMenu from "../../ProfileMenu/ProfileMenu";

const EmployeeNavbar = ({ onMenuClick }) => {
  const { auth } = useAuth();

  return (
    <header className="h-16 shrink-0 bg-white border-b flex items-center justify-between px-4 md:px-6">

      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <h1 className="font-semibold text-lg">
          Welcome, {auth?.name || "Employee"}
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="text-gray-500 cursor-pointer" />
        <ProfileMenu/>
      </div>

    </header>
  );
};

export default EmployeeNavbar;
