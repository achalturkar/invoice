import React, { useState } from "react";
import PendingApprovals from "../../../components/Leave/approvals/PendingApprovals";
import ApprovalHistory from "../../../components/Leave/approvals/ApprovalHistory";
import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";

export default function LeaveApproval() {

    const [tab, setTab] = useState("pending");

    return (
        <EmployeeLayout>
            <div className="p-6">

                <h1 className="text-2xl font-bold mb-6">Leave Approvals</h1>

                {/* Tabs */}
                <div className="flex gap-4 border-b mb-6">

                    <button
                        onClick={() => setTab("pending")}
                        className={`pb-2 ${tab === "pending" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                    >
                        Pending Approvals
                    </button>

                    <button
                        onClick={() => setTab("history")}
                        className={`pb-2 ${tab === "history" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                    >
                        My Approval History
                    </button>

                </div>

                {tab === "pending" && <PendingApprovals />}
                {tab === "history" && <ApprovalHistory />}

            </div>
        </EmployeeLayout>

    );
}
