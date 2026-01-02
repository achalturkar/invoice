import React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import ProfileMenu from "../../ProfileMenu/ProfileMenu";

const SuperAdminNavbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">

          <button
                  onClick={onMenuClick}
                  className="lg:hidden p-2 rounded hover:bg-gray-100"
                >
                  <Menu size={22} />
                </button>
       
        <h1 className="font-semibold text-gray-700">
          Super Admin Portal
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Bell className="text-gray-500 cursor-pointer" />
                  <ProfileMenu/>


        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          {/* <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
            SA
          </div>
          <span className="text-sm font-medium">Super Admin</span>
          <ChevronDown size={16} /> */}


        </div>
      </div>
    </header>
  );
};

export default SuperAdminNavbar;
