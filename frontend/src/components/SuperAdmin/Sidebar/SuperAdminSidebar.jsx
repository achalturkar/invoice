import React, { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Building2,
  UserPlus,
  Settings,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SuperAdminSidebar = ({ open, onClose }) => {
  // ✅ Desktop collapse state
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/super-admin/dashboard" },
    { name: "Search", icon: Search, path: "/super-admin/search" },
    { name: "Add Company", icon: Building2, path: "/super-admin/add-company" },
    { name: "Add Company Admin", icon: UserPlus, path: "/super-admin/add-company-admin" },
    { name: "Settings", icon: Settings, path: "/super-admin/settings" },
  ];

  return (
    <>
      {/* 🔲 Overlay (Mobile only) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* 📌 Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-slate-900 text-white
          h-screen
          transform transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          w-64
        `}
      >
        {/* 🧠 Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {!collapsed && (
            <span className="font-bold text-lg whitespace-nowrap">
              Super Admin Portal
            </span>
          )}

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-slate-800"
          >
            <X size={20} />
          </button>

          {/* Desktop Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded hover:bg-slate-800"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* 📚 Menu */}
        <nav className="mt-4 space-y-1">
          {menu.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm
                 hover:bg-slate-800 transition
                 ${isActive ? "bg-slate-800 border-l-4 border-indigo-500" : ""}`
              }
            >
              <item.icon size={18} />
              {!collapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SuperAdminSidebar;
