import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { leaveRequestDetail } from "../../../api/leave/leaveRequest";
import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";
import { getCandidateByUserId } from "../../../api/employeeApi";
import { formatDate } from "../../../utils/dateUtils";

export default function LeaveRequestDetail() {

    const { auth, loading: authLoading } = useAuth();
    const BASE_URL = "http://localhost:8080/api/companies";
    const companyId = auth?.companyId;
    const userId = auth?.id;

    const { id } = useParams();

    const [employeeId, setEmployeeId] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ================= GET EMPLOYEE ================= */
    useEffect(() => {

        const loadEmployee = async () => {

            if (!companyId || !userId) return;

            try {
                const employee = await getCandidateByUserId(companyId, userId);
                setEmployeeId(employee.id);
                console.log(employee);
            } catch (err) {
                console.error("Failed to load employee");
            }
        };

        loadEmployee();

    }, [companyId, userId]);

    /* ================= FETCH LEAVE DETAIL ================= */
    useEffect(() => {

        const fetchData = async () => {

            if (!companyId || !employeeId || !id) return;

            try {
                const res = await leaveRequestDetail(companyId, employeeId, id);
                setData(res);
                console.log(res)
            } catch (err) {
                console.error("Failed to fetch leave details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [companyId, employeeId, id]);

    /* ================= UI ================= */

    if (loading) return <div className="p-6">Loading...</div>;
    if (!data) return <div className="p-6">No Data Found</div>;

    const statusColor = {
        PENDING: "bg-yellow-100 text-yellow-700",
        APPROVED: "bg-green-100 text-green-700",
        REJECTED: "bg-red-100 text-red-700",
    };

    return (
        <EmployeeLayout>

            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl shadow flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold">Leave Request</h2>
                    <p className="text-sm opacity-90">
                        {data.leaveTypeName} • {data.totalDays} Day(s)
                    </p>
                </div>

                <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusColor[data.status]}`}>
                    {data.status}
                </span>
            </div>

            {/* DETAILS CARD */}
            <div className="bg-white p-6 rounded-xl shadow mt-6">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                    Leave Details
                </h3>

                <div className="grid md:grid-cols-3 gap-6 text-sm">

                    <div>
                        <p className="text-gray-500">Leave Type</p>
                        <p className="font-medium">{data.leaveTypeName}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Total Days</p>
                        <p className="font-medium">{data.totalDays}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Contact</p>
                        <p className="font-medium">{data.contact || "N/A"}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">From Date</p>
                        <p className="font-medium">{formatDate(data.fromDate)}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">To Date</p>
                        <p className="font-medium">{formatDate(data.toDate)}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Applied On</p>
                        <p className="font-medium">
                            {new Date(data.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <p className="text-gray-500">Reason</p>
                        <p className="font-medium">{data.reason}</p>
                    </div>

                </div>
            </div>

            {/* APPROVAL TIMELINE */}
            <div className="bg-white p-6 rounded-xl shadow mt-6">
                <h3 className="text-lg font-semibold mb-6 border-b pb-2">
                    Approval Timeline
                </h3>

                <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">

                    {data.approvals?.map((a, index) => (
                        <div key={index} className="relative">

                            {/* DOT */}
                            {/* <div className="absolute -left-[10px] top-1 w-4 h-4 rounded-full bg-indigo-500"></div> */}

                            <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center bg-gray-50 p-4 rounded-lg shadow-sm">

                                <div>
                                    <p className="font-medium">{a.approverName}</p>
                                    <p className="text-xs text-gray-500">
                                        Level {a.level}
                                    </p>
                                </div>

                                <div>
                                    <p className=""> <span className="font-semibold text-sm">Comment:</span>  {a.comment}</p>
                                </div>

                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[a.status]}`}>
                                    {a.status}
                                </span>

                                <p className="text-xs text-gray-500">
                                    {a.actionDate
                                        ? new Date(formatDate(a.actionDate)).toLocaleString()
                                        : "Pending"}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ATTACHMENT */}
            {data.filePath && (
                <div className="bg-white p-6 rounded-xl shadow mt-6 flex items-center justify-between">
                    <div>
                        <p className="font-medium">Attachment</p>
                        <p className="text-sm text-gray-500">
                            Supporting document uploaded
                        </p>
                    </div>

                    <a
                        href={`${BASE_URL}/leaveFile/${data.filePath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
                    >
                        View File
                    </a>
                </div>
            )}

        </EmployeeLayout>
    );
}
