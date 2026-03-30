import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLeaveType, getLeaveTypes } from "../../../api/leave/leaveType";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useAuth } from "../../../auth/AuthContext";

const LeaveTypeList = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {auth} = useAuth();

  const companyId = auth?.companyId;
  const role = auth?.role;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getLeaveTypes(companyId);
      setLeaveTypes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave type?")) {
      await deleteLeaveType(companyId, id);
      fetchData();
    }
  };

  return (
    <CompanyAdminLayout>
      {/* <div className="p-6 bg-gray-50 min-h-screen"> */}

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Leave Types
            </h1>
            <p className="text-sm text-gray-500">
              Manage company leave configurations
            </p>
          </div>

          {/* {(role === "COMPANY_ADMIN" || role === "HR") && ( */}
            <button
              onClick={() => navigate("/leave-types/create")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
            Create Leave 
            </button>
          {/* )} */}
        </div>

        {/* Table Card */}
        {/* <div className="bg-white shadow rounded-xl  border border-gray-200"> */}
        <div className="w-full overflow-x-auto relative">

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading...
            </div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-600">Code</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Max Days</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Carry Forward</th>
                  <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaveTypes.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-6 text-center text-gray-400"
                    >
                      No Leave Types Found
                    </td>
                  </tr>
                ) : (
                  leaveTypes.map((lt) => (
                    <tr
                      key={lt.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {lt.code}
                      </td>

                      <td className="px-6 py-4">{lt.name}</td>

                      <td className="px-6 py-4">{lt.maxDaysPerYear}</td>

                      <td className="px-6 py-4">{lt.carryForwardDays}</td>

                      <td className="px-6 py-4">
                        {lt.isActive ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-600">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Action Dropdown */}
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === lt.id ? null : lt.id
                            )
                          }
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ⋮
                        </button>

                        {openDropdown === lt.id && (
                          <div className="absolute right-6 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                              onClick={() =>
                                navigate(`/leave-types/${lt.id}/view`)
                              }
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              View
                            </button>

                            {(role === "COMPANY_ADMIN" ||
                              role === "HR") && (
                              <button
                                onClick={() =>
                                  navigate(`/leave-types/${lt.id}/edit`)
                                }
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              >
                                Edit
                              </button>
                            )}

                            {role === "COMPANY_ADMIN" &&
                              !lt.isDefault && (
                                <button
                                  onClick={() =>
                                    handleDelete(lt.id)
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      {/* </div> */}
    </CompanyAdminLayout>
  );
};

export default LeaveTypeList;
