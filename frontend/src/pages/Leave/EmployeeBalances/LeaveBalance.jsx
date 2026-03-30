import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getAllEmployeeBalances } from "../../../api/leave/employeeBalance";
import {  getCandidateByUserId } from "../../../api/employeeApi";
import { useAuth } from "../../../auth/AuthContext";
import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";

export default function LeaveBalance() {

  const { auth, loading: authLoading } = useAuth();

  const companyId = auth?.companyId;
  const userId = auth?.id;

  const [employeeId, setEmployeeId] = useState(null);

  const [year, setYear] = useState(new Date().getFullYear());
  const [leaveData, setLeaveData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= LOAD EMPLOYEE ================= */

  useEffect(() => {

    const loadEmployee = async () => {

      if (!companyId || !userId) return;

      try {

        const employee = await getCandidateByUserId(companyId, userId);

        console.log("Employee:", employee);

        setEmployeeId(employee.id);

      } catch (err) {

        setError("Failed to load employee");

      }

    };

    loadEmployee();

  }, [companyId, userId]);



  /* ================= FETCH BALANCES ================= */

  useEffect(() => {

    if (!authLoading && companyId && employeeId) {
      fetchBalances();
    }

  }, [authLoading, companyId, employeeId, year]);



  const fetchBalances = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getAllEmployeeBalances(
        companyId,
        employeeId,
        year
      );

      console.log("Balances:", data);

      setLeaveData(data || []);

    } catch (err) {

      setError(err.message || "Failed to load balances");

    } finally {

      setLoading(false);

    }

  };



  /* ================= EXPORT ================= */

  const handleExport = () => {

    if (!leaveData.length) return;

    const formatted = leaveData.map((leave) => ({
      "Leave Name": leave.leaveName,
      "Leave Code": leave.leaveCode,
      Opening: leave.openingBalance,
      CarryForward: leave.carryForwardDays,
      Taken: leave.takenDays,
      Remaining: leave.remainingDays,
      Lapsed: leave.lapsedDays,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Balance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Leave_Balance_${year}.xlsx`);
  };



  if (authLoading) {
    return (
      <EmployeeLayout>
        <div className="p-10 text-center text-slate-500">
          Loading user...
        </div>
      </EmployeeLayout>
    );
  }



  return (
    <EmployeeLayout>

      <div className="min-h-screen">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Leave Balance
            </h1>

            <p className="text-sm text-slate-500">
              Track your leave allocations
            </p>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 text-sm border px-4 py-2 rounded-md hover:bg-slate-100"
          >
            <Download size={16} />
            Export
          </button>

        </div>



        {/* YEAR FILTER */}

        <div className="bg-white border rounded-md p-4 mb-6">

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border px-3 py-2 rounded-md text-sm"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

        </div>



        {/* TABLE */}

        <div className="bg-white border rounded-md w-full max-w-7xl mx-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-100 text-xs uppercase">

              <tr>
                <th className="px-6 py-3 text-left">Leave Name</th>
                <th className="px-6 py-3 text-left">Code</th>
                <th className="px-6 py-3 text-center">Opening</th>
                <th className="px-6 py-3 text-center">Carry</th>
                <th className="px-6 py-3 text-center">Taken</th>
                <th className="px-6 py-3 text-center">Remaining</th>
                <th className="px-6 py-3 text-center">Lapsed</th>
              </tr>

            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td colSpan="7" className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && leaveData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No balances found
                  </td>
                </tr>
              )}

              {!loading &&
                leaveData.map((leave) => (

                  <tr key={leave.id} className="border-t">

                    <td className="px-6 py-4">
                      {leave.leaveName}
                    </td>

                    <td className="px-6 py-4">
                      {leave.leaveCode}
                    </td>

                    <td className="text-center">
                      {leave.openingBalance}
                    </td>

                    <td className="text-center">
                      {leave.carryForwardDays}
                    </td>

                    <td className="text-center text-red-500">
                      {leave.takenDays}
                    </td>

                    <td className="text-center font-semibold">
                      {leave.remainingDays}
                    </td>

                    <td className="text-center">
                      {leave.lapsedDays}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </EmployeeLayout>
  );
}
