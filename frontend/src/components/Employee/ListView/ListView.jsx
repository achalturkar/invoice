import React from "react";
import { formatDate } from "../../../utils/dateUtils";
import { useNavigate } from "react-router-dom";
export function ListView({ data }) {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[700px] w-full text-sm">

        <thead className="bg-gray-50 text-gray-600 border-b">
          <tr>
            <th className="py-3 text-left px-3">Leave Type</th>
            <th className="text-left px-3">Duration</th>
            <th className="text-center px-3">Days</th>
            <th className="text-center px-3">Status</th>
            <th className="text-center px-3">Payroll</th>
            <th className="text-center px-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((leave) => (
            <tr
              key={leave.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="py-3 px-3 font-medium">
                {leave.leaveTypeName}
              </td>

              <td className="px-3">
                {formatDate(leave.fromDate)} → {formatDate(leave.toDate)}
              </td>

              <td className="text-center px-3">
                {leave.totalDays}
              </td>

              <td className="text-center px-3">

                <span className={`px-2 py-1 rounded text-xs
                ${leave.status === "APPROVED" ? "bg-green-100 text-green-700" :
                    leave.status === "REJECTED" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"}`}>

                  {leave.status}

                </span>
              </td>

              <td className="text-center px-3 text-gray-500">
                {leave.payroll}
              </td>

              <td className="text-center px-3 text-indigo-600 cursor-pointer hover:underline">
                <button
                onClick={() => navigate(`/employee/leave/view/${leave.id}`)}
                >

                  View
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
