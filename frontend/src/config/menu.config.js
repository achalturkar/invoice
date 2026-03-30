import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  Search,
  UserPlus,
  Banknote
} from "lucide-react";

export const MENU_CONFIG = {
  COMPANY_ADMIN: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/company-admin/dashboard"
    },
    {
      label: "Company",
      icon: Building2,
      children: [
        { label: "Profile", path: "/company-admin/profile" },
        { label: "Bank Details", path: "/company/bank-accounts/all" },
        { label: "Admin Profile", path: "/company-admin/settings" }
      ]
    },
    {
      label: "Clients",
      icon: Users,
      path: "/clients"
    },
    {
      label: "Invoices",
      icon: FileText,
      path: "/invoices"
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/company-admin/settings"
    }
  ],

  SUPER_ADMIN: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/super-admin/dashboard"
    },
    {
      label: "Search",
      icon: Search,
      path: "/super-admin/search"
    },
    {
      label: "Company",
      icon: Building2,
      children: [
        { label: "Add Company", path: "/super-admin/add-company" },
        { label: "Add Admin", path: "/super-admin/add-company-admin" }
      ]
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/super-admin/settings"
    }
  ]
};
