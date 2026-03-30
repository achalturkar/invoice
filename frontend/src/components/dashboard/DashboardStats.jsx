import StatCard from "./StatCard";

export default function DashboardStats({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Invoice"
        value={summary.totalInvoice}
        type="Invoices"
      />
      <StatCard
        title="Total Candidates"
        value={summary.totalCandidates}
        type="candidates"
      />
      <StatCard
        title="Total Clients"
        value={summary.totalClients}
        type="clients"
      />
      <StatCard
        title="Total Projects"
        value={summary.totalProjects}
        type="projects"
      />
    </div>
  );
}
