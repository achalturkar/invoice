import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  Wallet,
  Folder,
  ChevronDown,
  ChevronRight,
  X,
  ChevronLeft
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import CompanyLogo from "../../common/CompanyLogo/CompanyLogo";

const EmployeeSidebar = ({ open, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { auth } = useAuth();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/employee/dashboard" },
    { name: "Attendance", icon: CalendarDays, path: "/employee/attendance" },

    {
      name: "Leave",
      icon: CalendarDays,
      dropdown: [
        { name: "Leave Dashboard", path: "/employee/leave/dashboard" },
        { name: "Leave Balance", path: "/employee/leave/balance" },
        { name: "Apply Leave", path: "/employee/leave/apply" },
        { name: "Leave History", path: "/employee/leave/history" },
        { name: "Holiday Calendar", path: "/employee/leave/holiday" },
        // { name: "Leave Policy", path: "/employee/leave/policy" },
        { name: "Leave Approval", path: "/employee/leave/approval" },

      ]
    },
    {
      name: "Salary",
      icon: CalendarDays,
      dropdown: [
        { name: "Payslip", path: "/employee/salary/payslip" },
        { name: "YTD Report", path: "/employee/salary/ytdReport" },
        { name: "IT Statement", path: "/employee/salary/statement" },
        { name: "IT Declaration", path: "/employee/salary/declaration" },
        { name: "Reimbursement", path: "/employee/salary/reimbursement" },
        { name: "Proof Of Investment", path: "/employee/salary/investment" },
        { name: "Salary Revision", path: "/employee/salary/revision" }
      ]
    },

    { name: "Payroll", icon: Wallet, path: "/employee/payroll" },
    { name: "Documents", icon: Folder, path: "/employee/documents" },
    { name: "Profile", icon: User, path: "/employee/profile" }
  ];

  // ✅ Auto-open dropdown if child active
  useEffect(() => {
    menu.forEach((item) => {
      if (item.dropdown) {
        const isActiveChild = item.dropdown.some((sub) =>
          location.pathname.startsWith(sub.path)
        );
        if (isActiveChild) {
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
      {/* Overlay */}
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
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          w-64
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b bg-white sticky top-0 z-10">
          {!collapsed && <CompanyLogo size={105} />}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded hover:bg-gray-100"
            >
              <X size={20} />
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1 rounded hover:bg-gray-100"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <nav className="mt-3 space-y-1 px-2 pb-6">
            {menu.map((item, index) => {
              const isDropdownActive =
                item.dropdown &&
                item.dropdown.some((sub) =>
                  location.pathname.startsWith(sub.path)
                );

              return (
                <div key={index}>
                  {/* Normal Link */}
                  {!item.dropdown && (
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group flex items-center ${collapsed ? "justify-center" : "gap-3"
                        } px-3 py-2.5 rounded-md text-sm font-medium transition
                        ${isActive
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

                  {/* Dropdown */}
                  {item.dropdown && (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"
                          } px-3 py-2.5 rounded-md text-sm font-medium transition
                        ${isDropdownActive
                            ? "bg-indigo-50 text-indigo-600"
                            : "hover:bg-gray-100"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={18} />
                          {!collapsed && <span>{item.name}</span>}
                        </div>

                        {!collapsed &&
                          (activeDropdown === item.name ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          ))}
                      </button>

                      {/* Dropdown Items */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${activeDropdown === item.name && !collapsed
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                          }`}
                      >
                        <div className="ml-8 mt-1 space-y-1">
                          {item.dropdown.map((sub, i) => (
                            <NavLink
                              key={i}
                              to={sub.path}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-sm transition
                                ${isActive
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

export default EmployeeSidebar;
