import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import {
  getCandidates,
  deleteCandidate
} from "../../../api/candidateApi";

export default function CandidateList() {
  const companyId = localStorage.getItem("companyId");
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  /* ================= LOAD DATA ================= */

  const loadCandidates = async () => {
    const data = await getCandidates(companyId);
    setCandidates(data);
  };

  useEffect(() => {
    if (companyId) loadCandidates();
  }, [companyId]);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= ACTIONS ================= */

  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this candidate?")) return;
    await deleteCandidate(companyId, id);
    setOpenMenuId(null);
    loadCandidates();
  };

  return (
    <CompanyAdminLayout>
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Candidates</h2>

          <Link
            to="/candidates/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
          >
            + Add Candidate
          </Link>
        </div>

        {/* TABLE (IMPORTANT: no overflow-hidden) */}
        <div className="relative">
          <table className="w-full text-sm border border-gray-200 border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3 border-r">Name</th>
                <th className="p-3 border-r">Email</th>
                <th className="p-3 border-r">Phone</th>
                <th className="p-3 border-r">Skills</th>
                <th className="p-3 border-r">Experience</th>
                <th className="p-3 border-r">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((c) => (
                <tr
                  key={c.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 border-r font-medium">
                    {c.fullName}
                  </td>
                  <td className="p-3 border-r">{c.email || "-"}</td>
                  <td className="p-3 border-r">{c.phone || "-"}</td>
                  <td className="p-3 border-r">{c.skills || "-"}</td>
                  <td className="p-3 border-r">
                    {c.experienceYears} yrs
                  </td>

                  <td className="p-3 border-r">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          c.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* ACTION MENU */}
                  <td className="p-3 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === c.id ? null : c.id
                        )
                      }
                      className="px-2 py-1 rounded hover:bg-gray-200"
                    >
                      ⋮
                    </button>

                    {openMenuId === c.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-6 mt-2 w-44 bg-white border rounded-lg shadow-lg z-[9999]"
                      >
                        <MenuItem
                          label="Edit"
                          onClick={() =>
                            navigate(`/candidates/edit/${c.id}`)
                          }
                        />

                        <MenuItem
                          label="Documents"
                          onClick={() =>
                            navigate(`/candidates/${c.id}/documents`)
                          }
                        />

                        {c.status === "ACTIVE" ? (
                          <MenuItem
                            label="Deactivate"
                            danger
                            onClick={() =>
                              handleDeactivate(c.id)
                            }
                          />
                        ) : (
                          <MenuItem
                            label="Activate"
                            onClick={() =>
                              alert("Activate API pending")
                            }
                          />
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {candidates.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-400"
                  >
                    No candidates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CompanyAdminLayout>
  );
}

/* ================= MENU ITEM ================= */

const MenuItem = ({ label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"
      }`}
  >
    {label}
  </button>
);
