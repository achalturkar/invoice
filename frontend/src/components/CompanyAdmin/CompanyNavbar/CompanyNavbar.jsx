import React from "react";
import { Menu, Bell, ArrowLeft } from "lucide-react";
import ProfileMenu from "../../ProfileMenu/ProfileMenu";
import { useAuth } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CompanyNavbar = ({ onMenuClick }) => {
  const { auth } = useAuth(); 

  const navigate =useNavigate();

  return (
    <header className="h-16 shrink-0 bg-white border-b flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-lg border hover:bg-gray-100"
          >
             <ArrowLeft size={18} />
          </button>

        <h1 className="font-bold text-lg text-orange-500">
          {auth?.companyName
            ? `${auth.companyName}`
            : "Company"}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <Bell className="text-gray-500 cursor-pointer" />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default CompanyNavbar;
