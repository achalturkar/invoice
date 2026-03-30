// ================= AUTH / COMMON =================
export { default as Login } from "./Login/Login";
export { default as Unauthorized } from "./Unauthorize/Unauthorized";

// ================= DASHBOARDS =================
export { default as SuperadminDashboard } from "./dashboard/superadminDashboard/SuperadminDashboard";
export { default as CompanyAdminDashboard } from "./dashboard/companyadminDashboard/CompanyadminDashboard";

// ================= SUPER ADMIN =================
export { default as Search } from "./SuperAdmin/Search/Search";
export { default as CreateCompany } from "./SuperAdmin/CreateCompany/CreateCompany";
export { default as AddCompanyAdmin } from "./SuperAdmin/AddCompanyAdmin/AddCompanyAdmin";
export { default as Settings } from "./SuperAdmin/Settings/Settings";
export { default as ManageCompany } from "./SuperAdmin/ManageCompany/ManageCompany";

// ================= COMPANY ADMIN – SETTINGS / PROFILE =================
export { default as CompanySettings } from "./CompanyAdmin/CompanySettings/CompanySettings";
export { default as CompanyProfile } from "./CompanyAdmin/CompanyProfile/CompanyProfile";
export { default as EditCompanyProfile } from "./CompanyAdmin/EditCompanyProfile/EditCompanyProfile";

// ================= CLIENTS =================
export { default as ClientList } from "./CompanyAdmin/Clients/ClientList";
export { default as AddClient } from "./CompanyAdmin/Clients/AddClient";
export { default as EditClient } from "./CompanyAdmin/Clients/EditClient";
export { default as ClientView } from "./CompanyAdmin/Clients/ClientView";

// ================= BANK ACCOUNTS =================
export { default as BankAccountList } from "./CompanyAdmin/BankAccount/BankAccountList";
export { default as BankAccountForm } from "./CompanyAdmin/BankAccount/BankAccountForm";

// ================= INVOICE =================
export { default as InvoiceList } from "./CompanyAdmin/Invoice/InvoiceList";
export { default as CreateInvoice } from "./CompanyAdmin/Invoice/CreateInvoice";
export { default as InvoiceView } from "./CompanyAdmin/Invoice/InvoiceView";
export { default as ClientInvoices } from "./CompanyAdmin/Invoice/ClientInvoices";

// ================= CANDIDATES =================
export { default as CandidateList } from "./CompanyAdmin/Candidates/CandidateList";
export { default as CandidateForm } from "./CompanyAdmin/Candidates/CandidateForm";

// ================= PROJECTS =================
export { default as ProjectList } from "./CompanyAdmin/Project/ProjectList";
export { default as ProjectCandidates } from "./CompanyAdmin/Project/ProjectCandidates";
export { default as ProjectForm } from "./CompanyAdmin/Project/ProjectForm";
