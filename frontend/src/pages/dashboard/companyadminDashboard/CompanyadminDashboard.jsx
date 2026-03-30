import React, { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Layers,
  FileText,
  Plus
} from "lucide-react";

import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getDashboardSummary } from "../../../api/dashboardApi";

import StatCard from "../../../components/dashboard/StatCard";
import StatCardSkeleton from "../../../components/dashboard/StatCardSkeleton";
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import RevenueChart from "../../../components/dashboard/RevenueChart";
import RecentActivity from "../../../components/dashboard/RecentActivity";
import Can from "../../../components/dashboard/rbac/Can";
import { useAuth } from "../../../auth/AuthContext";

const CompanyAdminDashboard = () => {
  // const companyId = localStorage.getItem("companyId");

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {auth} =useAuth();

  useEffect(() => {
    if (!auth.companyId) {
      setError("Company not found");
      setLoading(false);
      return;
    }

    getDashboardSummary(auth.companyId)
      .then((res) => {
        setSummary(res);
      })
      .catch((err) => {
        setError(err.message || "Failed to load dashboard");
      })
      .finally(() => setLoading(false));
  }, [auth.companyId]);

  return (
    <CompanyAdminLayout>
      <div className="p-6 bg-gray-50 min-h-full">

        <div className="flex flex-col md:flex-row justify-between items-center">
          <DashboardHeader
            title="Company Dashboard"
            subtitle="Overview of your business performance"
          />

          <Can permission="INVOICE_CREATE">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Plus size={18} /> Create Invoice
            </button>
          </Can>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            {error}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">



          {loading && [...Array(5)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}

          {!loading && summary && (
            <>
              <StatCard
                title="Total Invoices"
                value={summary.totalInvoice}
                icon={<FileText size={22} />}
                bg="bg-indigo-50"
                iconColor="text-indigo-600"
              />

              <StatCard
                title="Total Clients"
                value={summary.totalClients}
                icon={<Briefcase size={22} />}
                bg="bg-green-50"
                iconColor="text-green-600"
              />

              <StatCard
                title="Total Candidates"
                value={summary.totalCandidates}
                icon={<Users size={22} />}
                bg="bg-blue-50"
                iconColor="text-blue-600"
              />

              <StatCard
                title="Total Projects"
                value={summary.totalProjects}
                icon={<Layers size={22} />}
                bg="bg-orange-50"
                iconColor="text-orange-600"
              />
              <StatCard
                title="Total Accountants"
                value={0}
                icon={<Layers size={22} />}
                bg="bg-orange-50"
                iconColor="text-orange-600"
              />
            </>
          )}
        </div>
        {/* Charts + Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2">
            <RevenueChart />
          </div>
          <RecentActivity />
        </div>
      </div>
     
    </CompanyAdminLayout>
  );
};

export default CompanyAdminDashboard;
