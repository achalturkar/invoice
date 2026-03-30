import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CalendarCheck,
  Receipt
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import CompanyLogo from "../../common/CompanyLogo/CompanyLogo";

const CompanySidebar = ({ open, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/company-admin/dashboard" },
    { name: "Company Profile", icon: Building2, path: "/company-admin/profile" },

    {
      name: "Invoices",
      icon: Receipt,
      dropdown: [
        { name: "All Invoices", path: "/invoices" },
        { name: "Invoice Desk", path: "/invoices/desk" },
        { name: "Invoice Create", path: "/invoices/create/new" },
      ],
    },

    { name: "Clients", icon: Users, path: "/clients" },
    { name: "Employees", icon: UserCheck, path: "/employees" },

    {
      name: "Leave",
      icon: CalendarCheck,
      dropdown: [
        { name: "Leave Requests", path: "/leave/requests" },
        { name: "Leave flow", path: "/leave/flow" },
        { name: "Leave Policy", path: "/leave-policies" },
        { name: "Leave Type", path: "/leave-types" },
        { name: "Leave Balance", path: "/leave-balance/create" },
        { name: "Holiday Calendar", path: "/leave/holiday" },
      ],
    },

    { name: "Project", icon: FileText, path: "/project" },
    { name: "Accountants", icon: Users, path: "/accountants" },
    { name: "Settings", icon: Settings, path: "/company-admin/settings" },
  ];

  // ✅ Auto open dropdown if child route active
  useEffect(() => {
    menu.forEach((item) => {
      if (item.dropdown) {
        const isChildActive = item.dropdown.some((sub) =>
          location.pathname.startsWith(sub.path)
        );
        if (isChildActive) {
          setActiveDropdown(item.name);
        }
      }
    });
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-white text-gray-700 border-r border-gray-200
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-20" : "lg:w-60"}
          w-64
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b bg-white sticky top-0 z-10">
          {!collapsed && <CompanyLogo size={110} />}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Menu */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <nav className="mt-3 space-y-1 px-2 pb-6">
            {menu.map((item, i) => {
              const isDropdownActive =
                item.dropdown &&
                item.dropdown.some((sub) =>
                  location.pathname.startsWith(sub.path)
                );

              return (
                <div key={i}>
                  {/* Normal Menu */}
                  {!item.dropdown && (
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        } px-3 py-2.5 rounded-md text-sm font-medium transition
                        ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600"
                            : "hover:bg-gray-100"
                        }`
                      }
                    >
                      <item.icon size={18} />

                      {!collapsed && <span>{item.name}</span>}

                      {/* Tooltip when collapsed */}
                      {collapsed && (
                        <span className="absolute left-20 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          {item.name}
                        </span>
                      )}
                    </NavLink>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center ${
                          collapsed ? "justify-center" : "justify-between"
                        } px-3 py-2.5 text-sm font-medium rounded-md transition
                        ${
                          isDropdownActive
                            ? "bg-indigo-50 text-indigo-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={18} />
                          {!collapsed && <span>{item.name}</span>}
                            {/* Tooltip when collapsed */}
                      {collapsed && (
                        <span className="absolute left-20 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          {item.name}
                        </span>
                      )}
                        </div>

                        {!collapsed &&
                          (activeDropdown === item.name ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          ))}
                      </button>

                      {/* Dropdown Items */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          activeDropdown === item.name && !collapsed
                            ? "max-h-100 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="ml-8 mt-1 space-y-1">
                          {item.dropdown.map((sub, idx) => (
                            <NavLink
                              key={idx}
                              to={sub.path}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-sm transition
                                ${
                                  isActive
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "hover:bg-gray-100"
                                }`
                              }
                            >
                              {sub.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;
