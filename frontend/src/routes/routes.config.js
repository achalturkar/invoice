// src/routes/routes.config.js

export const SUPER_ADMIN_ROUTES = [
  { path: "dashboard", element: "SuperadminDashboard" },
  { path: "search", element: "Search" },
  { path: "create-company", element: "CreateCompany" },
  { path: "add-company-admin", element: "AddCompanyAdmin" },
  { path: "settings", element: "Settings" },
  { path: "manage-companies", element: "ManageCompany" }
];

export const COMPANY_ADMIN_ROUTES = [
  { path: "dashboard", element: "CompanyAdminDashboard" },
  { path: "settings", element: "CompanySettings" },
  { path: "profile", element: "CompanyProfile" },

  // clients
  { path: "clients", element: "ClientList" },
  { path: "clients/new", element: "AddClient" },
  { path: "clients/edit/:id", element: "EditClient" },
  { path: "clients/view/:id", element: "ClientView" },

  // bank accounts
  { path: "bank-accounts", element: "BankAccountList" },
  { path: "bank-accounts/new", element: "BankAccountForm" },
  { path: "bank-accounts/:id", element: "BankAccountForm" },

  // invoices
  { path: "invoices", element: "InvoiceList" },
  { path: "invoices/new", element: "CreateInvoice" },

  // candidates
  { path: "candidates", element: "CandidateList" },
  { path: "candidates/new", element: "CandidateForm" },
  { path: "candidates/edit/:id", element: "CandidateForm" }
];
