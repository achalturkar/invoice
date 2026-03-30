import React, { useState } from "react";
import { approveLeave, rejectLeave } from "../../../api/leave/leaveApproval";
import { useAuth } from "../../../auth/AuthContext";

export default function LeaveRequestDrawer({ request, onClose, reload, employeeId }) {

    const {auth} = useAuth();
    const companyId = auth?.companyId;


  const [comment, setComment] = useState("");

  const approve = async () => {

    await approveLeave(companyId, request.leaveRequestId, employeeId, {
      approved: true,
      comments: comment
    });

    reload();
    onClose();
  };

  const reject = async () => {

    await rejectLeave(companyId, request.leaveRequestId, employeeId,  {
      approved: false,
      comments: comment
    });

    reload();
    onClose();
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Leave Request
      </h2>

      <div className="space-y-3">

        <p><b>Employee:</b> {request.employeeName}</p>
        <p><b>Leave Type:</b> {request.leaveType}</p>
        <p><b>From:</b> {request.fromDate}</p>
        <p><b>To:</b> {request.toDate}</p>
        <p><b>Reason:</b> {request.reason}</p>

      </div>

      <textarea
        placeholder="Comment"
        className="w-full border mt-4 p-2 rounded"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex gap-3 mt-6">

        <button
          onClick={approve}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Approve
        </button>

        <button
          onClick={reject}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reject
        </button>

        <button
          onClick={onClose}
          className="border px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
}
