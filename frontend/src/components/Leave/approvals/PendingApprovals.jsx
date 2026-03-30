import React, { useEffect, useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import LeaveRequestTable from "./LeaveRequestTable";
import LeaveRequestDrawer from "./LeaveRequestDrawer";
import { getPendingApprovals } from "../../../api/leave/leaveApproval";
import { getCandidateByUserId } from "../../../api/employeeApi";

export default function PendingApprovals() {

    const { auth, loading: authLoading } = useAuth();

    const companyId = auth?.companyId;
    const userId = auth?.id;

    const [employeeId, setEmployeeId] = useState(null);
    const [requests, setRequests] = useState([]);
    const [selected, setSelected] = useState(null);



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
        const data = await getPendingApprovals(companyId, employeeId);
        setRequests(data);
    };

    return (
        <>
            <LeaveRequestTable
                requests={requests}
                onView={setSelected}
            />

            {selected && (
                <LeaveRequestDrawer
                    request={selected}
                    onClose={() => setSelected(null)}
                    reload={load}
                    employeeId={employeeId}
                />
            )}
        </>
    );
}
