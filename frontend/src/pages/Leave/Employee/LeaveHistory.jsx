import React, { useEffect, useState } from "react";
import { List, CalendarDays, Plus } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarView } from "../../../components/Employee/CalendarView/CalendarView";
import { ListView } from "../../../components/Employee/ListView/ListView";
import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { getCandidateByUserId } from "../../../api/employeeApi";
import { leaveRequestList } from "../../../api/leave/leaveRequest";


export default function LeaveHistory() {
  const [activeTab, setActiveTab] = useState("list");
  const navigate = useNavigate();


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
    const ans = await leaveRequestList(companyId, employeeId);
    console.log(ans);
    setData(ans);
  };





  return (
    <EmployeeLayout>

      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm border p-4 sm:p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Leave History
            </h2>
            <p className="text-sm text-gray-500">
              Detailed logs of all your leave requests
            </p>
          </div>

          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
            onClick={() => navigate("/employee/leave/apply")}>
            <Plus size={16} />
            New Request
          </button>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 pb-3 ${activeTab === "list"
                ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                : "text-gray-500"
              }`}
          >
            <List size={16} />
            List
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex items-center gap-2 pb-3 ${activeTab === "calendar"
                ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                : "text-gray-500"
              }`}
          >
            <CalendarDays size={16} />
            Calendar
          </button>
        </div>

        {/* CONTENT */}
        {activeTab === "list" ? (
          <ListView data={data} />
        ) : (
          <CalendarView leaveData={data} />
        )}
      </div>
    </EmployeeLayout>

  );
}
