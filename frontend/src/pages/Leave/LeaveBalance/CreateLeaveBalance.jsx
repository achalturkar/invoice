import React, { useEffect, useState } from "react";
import {
  createEmployeeBalance,
  deleteEmployeeBalance,
  getAllEmployeeBalances,
} from "../../../api/leave/employeeBalance";
import { useAuth } from "../../../auth/AuthContext";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getCandidates } from "../../../api/employeeApi";
import { getLeaveTypes } from "../../../api/leave/leaveType";

export default function CreateLeaveBalance() {
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    if (companyId) {
      fetchInitialData();
    }
  }, [companyId]);

  const fetchInitialData = async () => {
    try {
      const empData = await getCandidates(companyId);
      const leaveData = await getLeaveTypes(companyId);

      console.log("Employees:", empData); 
      console.log("LeaveTypes:", leaveData);

      setEmployees(empData || []);
      setLeaveTypes(leaveData || []);
    } catch (err) {
      setMessage(err.message);
    }
  };

  /* ================= FETCH BALANCES ================= */

  const fetchBalances = async (employeeId) => {
    if (!employeeId) return;

    try {
      setLoading(true);
      const data = await getAllEmployeeBalances(
        companyId,
        employeeId,
        year
      );
      setBalances(data || []);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchBalances(selectedUser);
    }
  }, [selectedUser, year]);

  /* ================= CREATE ================= */

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedLeaveType) {
      setMessage("Please select employee and leave type");
      return;
    }

    console.log("Creating for:", selectedUser);

    try {
      await createEmployeeBalance(
        companyId,
        selectedUser,
        selectedLeaveType,
        year
      );

      setMessage("Leave balance created successfully ✅");
      fetchBalances(selectedUser);
    } catch (err) {
      setMessage(err.message);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (balanceId) => {
    if (!selectedUser) return;

    try {
      await deleteEmployeeBalance(
        companyId,
        selectedUser,
        balanceId
      );

      fetchBalances(selectedUser);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <CompanyAdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Manage Employee Leave Balance
        </h1>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleCreate}
          className="bg-white border p-6 rounded-lg shadow-sm mb-8 grid grid-cols-4 gap-4"
        >
          {/* Employee Dropdown */}
          <select
            value={selectedUser}
            onChange={(e) => {
              const value = e.target.value;
              console.log("Selected user:", value);
              setSelectedUser(value);
            }}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option
                key={emp.id}
                value={ emp.id}
              >
                {emp.fullName
                  ? `${emp.fullName} `
                  : emp.name || emp.id}
              </option>
            ))}
          </select>

          {/* Leave Type Dropdown */}
          <select
            value={selectedLeaveType}
            onChange={(e) => setSelectedLeaveType(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((leave) => (
              <option key={leave.id} value={leave.id}>
                {leave.name} ({leave.code})
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border px-3 py-2 rounded-md"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
          >
            Create Balance
          </button>
        </form>

        {message && (
          <div className="mb-4 text-sm text-red-500">{message}</div>
        )}

        {/* ================= TABLE ================= */}

        <div className="bg-white border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Leave Name</th>
                <th className="text-center">Opening</th>
                <th className="text-center">Carry</th>
                <th className="text-center">Taken</th>
                <th className="text-center">Remaining</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : balances.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    No balances found
                  </td>
                </tr>
              ) : (
                balances.map((balance) => (
                  <tr key={balance.id} className="border-t">
                    <td className="px-4 py-3">
                      {balance.leaveName} ({balance.leaveCode})
                    </td>
                    <td className="text-center">
                      {balance.openingBalance}
                    </td>
                    <td className="text-center">
                      {balance.carryForwardDays}
                    </td>
                    <td className="text-center text-red-500">
                      {balance.takenDays}
                    </td>
                    <td className="text-center font-semibold">
                      {balance.remainingDays}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(balance.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CompanyAdminLayout>
  );
}
