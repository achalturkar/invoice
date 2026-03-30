import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLeavePolicy, getLeavePolicy } from "../../../api/leave/leavePolicy";
import { useAuth } from "../../../auth/AuthContext";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

const LeavePolicyList = () => {
  const { auth } = useAuth();
  const companyId = auth?.companyId;
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    if (companyId) loadPolicies();
  }, [companyId]);

  const loadPolicies = async () => {
    const data = await getLeavePolicy(companyId);
    setPolicies(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this policy?")) return;
    await deleteLeavePolicy(id, companyId);
    loadPolicies();
  };

  return (
    <CompanyAdminLayout>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Leave Policies</h2>
          <button
            onClick={() => navigate("/leave-policies/create")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Policy
          </button>
        </div>

        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Leave Type</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Entitlement</th>
                <th className="p-3 text-left">Effective From</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {policies.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.leaveTypeCode}</td>
                  <td className="p-3">{p.leaveTypeName}</td>
                  <td className="p-3">{p.policyYear}</td>
                  <td className="p-3">{p.totalEntitlementDays} Days</td>
                  <td className="p-3">{p.effectiveFrom}</td>

                  <td className="p-3 relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === p.id ? null : p.id)
                      }
                      className="px-2 py-1 border rounded"
                    >
                      ⋮
                    </button>

                    {openMenuId === p.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border shadow rounded-lg z-10">
                        <button
                          onClick={() =>
                            navigate(`/leave-policies/view/${p.id}`)
                          }
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/leave-policies/edit/${p.id}`)
                          }
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {policies.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-400">
                    No Leave Policies Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </CompanyAdminLayout>
  );
};

export default LeavePolicyList;
