import React, { useEffect, useState } from "react";
import { getMyApprovalHistory } from "../../../api/leave/leaveApproval";
import { useAuth } from "../../../auth/AuthContext";
import LeaveRequestTable from "./LeaveRequestTable";
import { getCandidateByUserId } from "../../../api/employeeApi";

export default function ApprovalHistory() {

    const { auth, loading: authLoading } = useAuth();

    const companyId = auth?.companyId;
    const userId = auth?.id;

    const [employeeId, setEmployeeId] = useState(null);
    const [data, setData] = useState([]);


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

    useEffect(() => {

        if (!companyId || !employeeId) return;

        load();

    }, [companyId, employeeId]);

    const load = async () => {
        const res = await getMyApprovalHistory(companyId, employeeId);
        setData(res);
    };

    return (
        <LeaveRequestTable requests={data} />
    );
}
