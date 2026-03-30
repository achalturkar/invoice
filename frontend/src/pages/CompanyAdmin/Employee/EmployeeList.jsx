import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getCandidates, deleteCandidate } from "../../../api/employeeApi";
import { useAuth } from "../../../auth/AuthContext";

export default function EmployeeList() {
  const navigate = useNavigate();

    const {auth} = useAuth();
    const companyId = auth?.companyId;

  const [candidates, setCandidates] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  /* ================= LOAD ================= */
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

  /* ================= ACTION ================= */
  const handleDeactivate = async (id) => {
    if (!window.confirm("Deactivate this candidate?")) return;
    await deleteCandidate(companyId, id);
    setOpenMenuId(null);
    loadCandidates();
  };

  return (
    <CompanyAdminLayout>
      {/* <div className="max-w-7xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow"> */}

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            Employees
          </h2>

          <Link
            to="/employees/new"
            className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700"
          >
            + Add Candidate
          </Link>
        </div>

        {/* ✅ HORIZONTAL SCROLL WRAPPER */}
        <div className="w-full overflow-x-auto relative">
          {/* <table className="min-w-[900px] w-full text-sm border border-gray-200 border-collapse"> */}
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3 border-r">Name</th>
                <th className="p-3 border-r">Email</th>
                <th className="p-3 border-r">Phone</th>
                <th className="p-3 border-r">Skills</th>
                <th className="p-3 border-r">Role</th>
                <th className="p-3 border-r">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border-r font-medium whitespace-nowrap">
                    {c.fullName}
                  </td>
                  <td className="p-3 border-r whitespace-nowrap">
                    {c.email || "-"}
                  </td>
                  <td className="p-3 border-r whitespace-nowrap">
                    {c.phone || "-"}
                  </td>
                  <td className="p-3 border-r">
                    {c.skills || "-"}
                  </td>
                  <td className="p-3 border-r whitespace-nowrap">
                    {c.role} 
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

                  {/* ACTIONS */}
                  <td className="p-3 text-right relative overflow-visible">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === c.id ? null : c.id)
                      }
                      className="px-2 py-1 rounded hover:bg-gray-200"
                    >
                      ⋮
                    </button>

                    {openMenuId === c.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-2 mt-2 w-40 bg-white border rounded-lg shadow-lg z-[9999]"
                      >
                        <MenuItem
                          label="Edit"
                          onClick={() =>
                            navigate(`/employees/edit/${c.id}`)
                          }
                        />
                        <MenuItem
                          label="Documents"
                          onClick={() =>
                            navigate(`/employees/${c.id}/documents`)
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

        {/* MOBILE HINT */}
        <p className="text-xs text-gray-400 mt-2 md:hidden">
          Swipe left/right to see full table →
        </p>

      {/* </div> */}
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
