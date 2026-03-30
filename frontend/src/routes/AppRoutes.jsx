import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";
import CompanyAdminDashboard from "../pages/dashboard/companyadminDashboard/CompanyadminDashboard";
import SuperadminDashboard from "../pages/dashboard/superadminDashboard/SuperadminDashboard";
import Login from "../pages/Login/Login";
import Unauthorized from "../pages/Unauthorize/Unauthorized";
import Search from "../pages/SuperAdmin/Search/Search";
import AddCompanyAdmin from "../pages/SuperAdmin/AddCompanyAdmin/AddCompanyAdmin";
import Settings from "../pages/SuperAdmin/Settings/Settings";
import CompanySettings from "../pages/CompanyAdmin/CompanySettings/CompanySettings";
import CreateCompany from "../pages/SuperAdmin/CreateCompany/CreateCompany";
import CompanyProfile from "../pages/CompanyAdmin/CompanyProfile/CompanyProfile";
import EditCompanyProfile from "../pages/CompanyAdmin/EditCompanyProfile/EditCompanyProfile";
import ClientList from "../pages/CompanyAdmin/Clients/ClientList";
import AddClient from "../pages/CompanyAdmin/Clients/AddClient";
import EditClient from "../pages/CompanyAdmin/Clients/EditClient";
import ClientView from "../pages/CompanyAdmin/Clients/ClientView";
import CandidateForm from "../pages/CompanyAdmin/Employee/EmployeeForm";
import ProjectList from "../pages/CompanyAdmin/Project/ProjectList";
import ProjectCandidates from "../pages/CompanyAdmin/Project/ProjectCandidates";
import ProjectForm from "../pages/CompanyAdmin/Project/ProjectForm";
import InvoiceList from "../pages/CompanyAdmin/Invoice/InvoiceList";
import CreateInvoice from "../pages/CompanyAdmin/Invoice/CreateInvoice";
import InvoiceView from "../pages/CompanyAdmin/Invoice/InvoiceView";
import ClientInvoices from "../pages/CompanyAdmin/Invoice/ClientInvoices";
import ManageCompany from "../pages/SuperAdmin/ManageCompany/ManageCompany";
import BankAccountList from "../pages/CompanyAdmin/BankAccount/BankAccountList";
import BankAccountForm from "../pages/CompanyAdmin/BankAccount/BankAccountForm";
import CompanyAddressListPage from "../pages/CompanyAdmin/CompanyProfile/CompanyAddressListPage";
import CompanyAddressCreatePage from "../pages/CompanyAdmin/CompanyProfile/CompanyAddressCreatePage";
import CompanyAddressEditPage from "../pages/CompanyAdmin/CompanyProfile/CompanyAddressEditPage";
import AddClientAddress from "../pages/CompanyAdmin/Clients/AddClientAddress";
import InvoiceDesk from "../pages/CompanyAdmin/InvoiceDesk/InvoiceDesk";
import EmployeeDashboard from "../pages/dashboard/EmployeeDashboard/EmployeeDashboard";
import EmployeeForm from "../pages/CompanyAdmin/Employee/EmployeeForm";
import LeaveDashboard from "../pages/Leave/Employee/LeaveDashboard";
import ApplyLeave from "../pages/Leave/Employee/ApplyLeave";
import LeaveHistory from "../pages/Leave/Employee/LeaveHistory";
import Holiday from "../pages/Leave/Holiday/Holiday";
import LeaveBalance from "../pages/Leave/EmployeeBalances/LeaveBalance";
import PublicRoute from "../auth/PublicRote";
import EmployeeList from "../pages/CompanyAdmin/Employee/EmployeeList";
import LeaveTypeList from "../pages/Leave/LeaveType/LeaveTypeList";
import LeaveTypeCreate from "../pages/Leave/LeaveType/LeaveTypeCreate";
import LeaveTypeEdit from "../pages/Leave/LeaveType/LeaveTypeEdit";
import LeaveTypeView from "../pages/Leave/LeaveType/LeaveTypeView";
import LeavePolicyList from "../pages/Leave/LeavePolicy/LeavePolicyList";
import LeavePolicyCreate from "../pages/Leave/LeavePolicy/LeavePolicyCreate";
import LeavePolicyView from "../pages/Leave/LeavePolicy/LeavePolicyView";
import LeavePolicyEdit from "../pages/Leave/LeavePolicy/LeavePolicyEdit";
import BankAccountDetails from "../pages/CompanyAdmin/BankAccount/BankAccountDetails";
import BankAccountView from "../pages/CompanyAdmin/BankAccount/BankAccountView";
import InvoiceDeskList from "../pages/CompanyAdmin/InvoiceDesk/invoiceDeskList";
import InvoiceCreate from "../pages/CompanyAdmin/InvoiceDesk/invoiceCreate";
import InvoiceDeskPage from "../pages/CompanyAdmin/InvoiceDesk/InvoiceDeskPage";
import CreateLeaveBalance from "../pages/Leave/LeaveBalance/CreateLeaveBalance";
import ApprovalFlow from "../pages/Leave/LeaveApproval/ApprovalFlow";
import LeaveApproval from "../pages/Leave/LeaveApproval/LeaveApproval";
import AddHoliday from "../pages/Leave/Holiday/AddHoliday";
import LeaveRequestDetail from "../pages/Leave/Employee/LeaveRequestDetail";

const AppRoutes = () => {
    return (
        <Routes>
            {/*  Public Route */}
            <Route element={<PublicRoute />}>
                <Route path="/" element={<Login />} />
            </Route>

            {/*  SUPER ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>

                <Route path="/super-admin/dashboard" element={<SuperadminDashboard />} />
                <Route path="/super-admin/search" element={<Search />} />
                <Route path="/super-admin/add-company" element={<CreateCompany />} />
                <Route path="/super-admin/add-company-admin" element={<AddCompanyAdmin />} />
                <Route path="/super-admin/create-company" element={<CreateCompany />} />
                <Route path="/super-admin/settings" element={<Settings />} />
                <Route path="/super-admin/Manage-companies" element={<ManageCompany />} />

            </Route>



            {/* ======================== COMPANY ADMIN======================== */}


            <Route element={<ProtectedRoute allowedRoles={["COMPANY_ADMIN"]} />}>

                <Route path="/company-admin/dashboard" element={<CompanyAdminDashboard />} />
                <Route path="/company-admin/settings" element={<CompanySettings />} />
                <Route path="/company-admin/profile" element={<CompanyProfile />} />
                <Route path="/company-admin/profile/address" element={<CompanyAddressListPage />} />
                <Route path="/company-admin/profile/address/new" element={<CompanyAddressCreatePage />} />
                <Route path="/company-admin/profile/address/edit/:id" element={<CompanyAddressEditPage />} />
                <Route path="/edit/profile" element={<EditCompanyProfile />} />
                {/* <Route path="/edit/bank" element={<EditBankDetails />}/> */}

                {/* clients */}

                <Route path="/clients" element={<ClientList />} />
                <Route path="/clients/new" element={<AddClient />} />
                <Route path="/clients/:clientId/addresses/new" element={<AddClientAddress />} />
                <Route path="/clients/view/:clientId" element={<ClientView />} />
                <Route path="/clients/edit/:clientId" element={<EditClient />} />
                <Route path="/company/:companyId/clients/:clientId/invoices" element={<ClientInvoices />} />

                {/* bank account */}

                <Route path="/company/bank-accounts/all" element={<BankAccountList />} />
                <Route path="/company/bank-accounts/new" element={<BankAccountForm />} />
                <Route path="/company/bank-accounts/:id" element={<BankAccountForm />} />
                <Route path="/company/bank-accounts/view/:id" element={<BankAccountView />} />



                {/* Employee */}

                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/new" element={<EmployeeForm />} />?
                <Route path="/employees/edit/:id" element={<CandidateForm />} />
                {/* <Route path="/candidates/:id/documents" element={<CandidateDocuments />} /> */}

                {/* Project */}

                <Route path="/project" element={<ProjectList />} />
                <Route path="/project-candidate" element={<ProjectCandidates />} />
                <Route path="/projects/new" element={<ProjectForm />} />

                {/* Invoice */}

                <Route path="/invoices" element={<InvoiceList />} />
                {/* <Route path="/invoices/:id" element={<InvoiceView/>}/> */}
                <Route path="/invoices/new" element={<CreateInvoice />} />
                <Route path="/invoices/desk" element={<InvoiceDeskList />} />
                <Route path="/invoices/desk/new" element={<InvoiceDesk />} />
                <Route path="/invoices/create/new" element={<InvoiceCreate />} />

                {/* Leave */}

                <Route path="/leave-types" element={<LeaveTypeList />} />
                <Route path="/leave-types/create" element={<LeaveTypeCreate />} />
                <Route path="/leave-types/:id/edit" element={<LeaveTypeEdit />} />
                <Route path="/leave-types/:id/view" element={<LeaveTypeView />} />


                <Route path="/leave-balance/create" element={<CreateLeaveBalance />} />

                {/* <Route path="/employee/leave/balance" element={<LeaveBalance />} /> */}


                {/* Leave Policies  */}

                <Route path="/leave-policies" element={<LeavePolicyList />} />
                <Route path="leave-policies/create" element={<LeavePolicyCreate />} />
                <Route path="leave-policies/view/:id" element={<LeavePolicyView />} />
                <Route path="leave-policies/edit/:id" element={<LeavePolicyEdit />} />

                <Route path="/leave/flow" element={<ApprovalFlow />} />

                {/* Holiday  */}
                <Route path="/leave/holiday" element={<Holiday />} />
                <Route path="/employee/add-holiday" element={<AddHoliday />} />


            </Route>


            {/* ======================== Employee ======================== */}


            <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE", "HR"]} />}>

                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee/leave/dashboard" element={<LeaveDashboard />} />
                <Route path="/employee/leave/apply" element={<ApplyLeave />} />
                <Route path="/employee/leave/view/:id" element={<LeaveRequestDetail />} />
                <Route path="/employee/leave/history" element={<LeaveHistory />} />
                <Route path="/employee/leave/holiday" element={<Holiday />} />
                <Route path="/employee/leave/balance" element={<LeaveBalance />} />
                <Route path="/employee/leave/approval" element={<LeaveApproval />} />


            </Route>

            {/*  Unauthorized */}
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
};

export default AppRoutes;
