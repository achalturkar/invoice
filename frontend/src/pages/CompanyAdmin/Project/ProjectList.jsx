import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getProjects } from "../../../api/projectApi";


export default function ProjectList() {
  const companyId = localStorage.getItem("companyId");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(companyId).then(setProjects);
  }, [companyId]);

  return (
    <CompanyAdminLayout>
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Projects</h2>
          <Link
            to="/projects/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add Project
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Project Name</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td>{p.status}</td>
                <td className="text-right pr-4 space-x-3">
                  <Link
                    to={`/projects/${p.id}/candidates`}
                    className="text-blue-600"
                  >
                    Candidates
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CompanyAdminLayout>
  );
}
