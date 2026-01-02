import React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import ProfileMenu from "../../ProfileMenu/ProfileMenu";

const CompanyNavbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <h1 className="font-semibold text-gray-700">
          Company Admin Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <Bell className="text-gray-500 cursor-pointer" />
        <ProfileMenu/>

        {/* Profile */}
        {/* <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
            CA
          </div>
          <span className="hidden md:block text-sm font-medium">
            Company Admin
          </span>
          <ChevronDown size={16} />
        </div> */}
      </div>
    </header>
  );
};

export default CompanyNavbar;
