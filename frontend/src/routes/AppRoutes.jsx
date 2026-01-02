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
import EditBankDetails from "../pages/CompanyAdmin/EditBankDetails/EditBankDetails";
import ClientList from "../pages/CompanyAdmin/Clients/ClientList";
import AddClient from "../pages/CompanyAdmin/Clients/AddClient";
import EditClient from "../pages/CompanyAdmin/Clients/EditClient";
import ClientView from "../pages/CompanyAdmin/Clients/ClientView";
import CandidateList from "../pages/CompanyAdmin/Candidates/CandidateList";
import CandidateForm from "../pages/CompanyAdmin/Candidates/CandidateForm";
import ProjectList from "../pages/CompanyAdmin/Project/ProjectList";
import ProjectCandidates from "../pages/CompanyAdmin/Project/ProjectCandidates";
import ProjectForm from "../pages/CompanyAdmin/Project/ProjectForm";
// import CandidateDocuments from "../pages/CompanyAdmin/Candidates/CandidateDocuments";

const AppRoutes = () => {
    return (
        <Routes>
            {/*  Public Route */}
            <Route path="/" element={<Login />} />

            {/*  SUPER ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>
                <Route
                    path="/super-admin/dashboard"
                    element={<SuperadminDashboard />}
                />
                <Route
                    path="/super-admin/search"
                    element={<Search />}
                />
                <Route
                    path="/super-admin/add-company"
                    element={<CreateCompany />}
                />
                <Route
                    path="/super-admin/add-company-admin"
                    element={<AddCompanyAdmin />}
                />
                <Route
                    path="/super-admin/create-company"
                    element={<CreateCompany />}
                />
                <Route
                    path="/super-admin/settings"
                    element={<Settings />}
                />
            </Route>

            {/*  COMPANY ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["COMPANY_ADMIN"]} />}>
                <Route
                    path="/company-admin/dashboard"
                    element={<CompanyAdminDashboard />}
                />
                <Route
                    path="/company-admin/settings"
                    element={<CompanySettings />}
                />
                <Route
                    path="/company-admin/profile"
                    element={<CompanyProfile />}
                />
                <Route
                    path="/edit/profile"
                    element={<EditCompanyProfile />}
                />
                <Route
                    path="/edit/bank"
                    element={<EditBankDetails />}
                />

                {/* clients */}
                <Route
                    path="/clients"
                    element={<ClientList />}
                />
                <Route path="/clients/new"
                    element={<AddClient />} />

                <Route path="/clients/view/:id" element={<ClientView />} />
                <Route path="/clients/edit/:id" element={<EditClient />} />

                {/* Candidates */}

                <Route path="/candidates" element={<CandidateList />} />
                <Route path="/candidates/new" element={<CandidateForm />} />?
                <Route path="/candidates/edit/:id" element={<CandidateForm />} />
                {/* <Route path="/candidates/:id/documents" element={<CandidateDocuments />} /> */}

                  {/* Project */}

                <Route path="/project" element={<ProjectList />} />
                <Route path="/project-candidate" element={<ProjectCandidates/>}/>
                <Route path="/projects/new" element={<ProjectForm/>}/>


            </Route>

            {/* 🚫 Unauthorized */}
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
};

export default AppRoutes;
