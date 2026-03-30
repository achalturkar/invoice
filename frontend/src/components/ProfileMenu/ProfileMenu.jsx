import React, { useEffect, useState, useRef } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { getLoggedInUser } from "../../api/authApi";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { setAuth } = useAuth();


  //  Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getLoggedInUser();
        setUser(data);
      } catch (error) {
        console.log("Failed to load profile");
        logout(); // if token invalid
      }
    };

    fetchUser();
  }, []);


  //  Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const { logout } = useAuth();


  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold"
      >
        {user.name?.charAt(0)}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.companyName}</p>
            <p className="text-xs text-gray-500">{user.company}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-500">{user.mobile}</p>
          </div>

          {/* Actions */}
          <div className="py-2">
            <button
              onClick={() => navigate("/company-admin/profile")}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <User size={16} /> View Profile
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} /> Logout
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
