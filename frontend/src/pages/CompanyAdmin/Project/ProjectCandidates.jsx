import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCandidates } from "../../../api/candidateApi";
import {
  assignCandidateToProject,
  getCandidatesOfProject
} from "../../../api/assignmentApi";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

export default function ProjectCandidates() {
  const { projectId } = useParams();
  const companyId = localStorage.getItem("companyId");

  const [allCandidates, setAllCandidates] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [candidateId, setCandidateId] = useState("");

  useEffect(() => {
    getCandidates(companyId).then(setAllCandidates);
    getCandidatesOfProject(projectId).then(setAssigned);
  }, [companyId, projectId]);

  const assign = async () => {
    await assignCandidateToProject(companyId, {
      projectId,
      candidateId,
      allocationPercent: 100
    });
    setCandidateId("");
    getCandidatesOfProject(projectId).then(setAssigned);
  };

  return (
    <CompanyAdminLayout>
      <div className="bg-white p-6 rounded-xl shadow max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Project Candidates</h2>

        {/* ASSIGN */}
        <div className="flex gap-3 mb-6">
          <select
            value={candidateId}
            onChange={e => setCandidateId(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select Candidate</option>
            {allCandidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.fullName}
              </option>
            ))}
          </select>

          <button
            onClick={assign}
            disabled={!candidateId}
            className="bg-indigo-600 text-white px-4 rounded"
          >
            Assign
          </button>
        </div>

        {/* LIST */}
        <ul className="space-y-2">
          {assigned.map(a => (
            <li
              key={a.id}
              className="border p-3 rounded flex justify-between"
            >
              <span>{a.candidateName}</span>
              <span className="text-sm text-gray-500">
                {a.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </CompanyAdminLayout>
  );
}
