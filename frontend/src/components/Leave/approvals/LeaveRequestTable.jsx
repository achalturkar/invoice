import React from "react";
import { formatDate } from "../../../utils/dateUtils";

export default function LeaveRequestTable({ requests, onView }) {

  return (
    <div className="bg-white rounded-lg shadow">

      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Employee</th>
            <th className="p-3 text-left">Leave Type</th>
            <th className="p-3 text-left">From</th>
            <th className="p-3 text-left">To</th>
            <th className="p-3 text-left">Days</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>

          {requests.map((r) => (
            <tr key={r.id} className="border-t">

              <td className="p-3">{r.employeeName}</td>
              <td className="p-3">{r.leaveType}</td>
              <td className="p-3">{formatDate(r.fromDate)}</td>
              <td className="p-3">{formatDate(r.toDate)}</td>
              <td className="p-3">{r.days}</td>

              <td className="p-3">

                <span className={`px-2 py-1 rounded text-xs
                ${r.status === "APPROVED" ? "bg-green-100 text-green-700" :
                    r.status === "REJECTED" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"}`}>

                  {r.status}

                </span>

              </td>

              <td className="p-3">

                {onView && (
                  <button
                    onClick={() => onView(r)}
                    className="text-blue-600"
                  >
                    View
                  </button>
                )}

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}
