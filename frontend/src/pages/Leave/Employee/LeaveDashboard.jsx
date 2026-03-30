import React, { useEffect, useState } from "react";
import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";
import {
  CalendarDays,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { getCandidateByUserId } from "../../../api/employeeApi";
import { getAllEmployeeBalances } from "../../../api/leave/employeeBalance";
import { leaveRequestRecentList } from "../../../api/leave/leaveRequest";
import { getUpcomingHolidays } from "../../../api/leave/holiday";
import { formatDate } from "../../../utils/dateUtils";

export default function LeaveDashboard() {

  const navigate = useNavigate();

  const { auth, loading: authLoading } = useAuth();

  const companyId = auth?.companyId;
  const userId = auth?.id;

  const [employeeId, setEmployeeId] = useState(null);

  const [year, setYear] = useState(new Date().getFullYear());
  const [leaveData, setLeaveData] = useState([]);
  const [recentLeave, setRecentLeave] = useState([]);
  const [upcomingHoliday, setUpcomingaHoliday] = useState([]);

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

  useEffect(() => {

    const recentData = async () => {
      if (!companyId || !employeeId) return;
      try {
        const data = await leaveRequestRecentList(companyId, employeeId);
        console.log("Recent Leave:", data);
        setRecentLeave(data || []);
      } catch (err) {
        console.error("Recent Leave Error:", err);
        setRecentLeave([]);
      }
    };
    recentData();
  }, [companyId, employeeId]);




  useEffect(() => {

    const holidays = async () => {
      try {
        const data = await getUpcomingHolidays(companyId);
        console.log(data);
        setUpcomingaHoliday(data || []);

      } catch (err) {
        console.error("Recent Holiday Error:", err);
      }
    }
    holidays();
  }, [companyId]);


  const teamOnLeave = [
    { name: "Amit Kumar" },
    { name: "Riya Sharma" },
    { name: "Jay Patel" }
  ];

  const chartData = [
    { month: "Jan", Casual: 2, Sick: 1, Earned: 3 },
    { month: "Feb", Casual: 3, Sick: 2, Earned: 4 },
    { month: "Mar", Casual: 1, Sick: 1, Earned: 2 }
  ];

  return (
    <EmployeeLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Leave Dashboard</h1>

          <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
            >
              Leave Report
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
              onClick={() => navigate("/employee/leave/apply")}
            >
              Apply Leave
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {leaveData.map((item, i) => {
            const percent = item.openingBalance ? (item.takenDays / item.openingBalance) * 100 : 0;
            return (
              <div key={i}
                className={`bg-white rounded-xl shadow p-5 border-l-4 border-blue-500`}
              >
                <h4 className="text-sm text-gray-500">{item.leaveName}</h4>
                <div className="text-2xl font-bold mt-1">
                  {item.takenDays}
                  {item.openingBalance !== 0 && <span className="text-gray-400 text-sm"> / {item.openingBalance}</span>}
                </div>

                {item.openingBalance !== 0 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(percent)}% used
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PAYROLL ALERT */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center gap-3 text-orange-600">
            <AlertTriangle size={20} />
            <span className="text-sm">
              0 Leave request impacts payroll this month
            </span>
          </div>
          <button className="text-sm font-medium underline">
            View Details
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE - 2/3 WIDTH */}
          <div className="lg:col-span-2 space-y-6">

            {/* RECENT LEAVES */}
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">
                  Recent Leave Requests
                </h3>
                <button className="text-sm text-indigo-600 hover:underline"
                  onClick={() => navigate("/employee/leave/history")}
                >
                  View History
                </button>
              </div>

              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2 text-left">Type</th>
                    <th className="text-center">Days</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Payroll</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeave.map((leave, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-medium">{leave.leaveTypeName}</td>
                      <td className="text-center">{leave.totalDays}</td>
                      <td className="text-center">
                        <StatusBadge status={leave.status} />
                      </td>
                      <td className="text-center text-gray-500">
                        {leave.payroll}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CHART */}
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-indigo-500" />
                <h3 className="font-semibold text-gray-800">
                  Leave Trend
                </h3>
              </div>

              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Casual" fill="#6366f1" />
                  <Bar dataKey="Sick" fill="#22c55e" />
                  <Bar dataKey="Earned" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* RIGHT SIDE - 1/3 WIDTH */}
          <div className="space-y-6">

            {/* UPCOMING HOLIDAYS */}
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <h3 className="font-semibold text-gray-800 mb-4">
                Upcoming Holidays
              </h3>

              {upcomingHoliday.map((holiday, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3 border-b last:border-0"
                >
                  <CalendarDays size={18} className="text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium">
                      {formatDate(holiday.holidayDate)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {holiday.holidayName}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* TEAM ON LEAVE */}
            <div className="bg-white rounded-2xl shadow-sm border p-5">
              <h3 className="font-semibold text-gray-800 mb-4">
                Team On Leave Today
              </h3>

              <div className="space-y-3">
                {teamOnLeave.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar name={member.name} />
                    <span className="text-sm font-medium">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </EmployeeLayout>
  );
}

/* STATUS BADGE */
const StatusBadge = ({ status }) => {
  const colors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

/* AVATAR */
const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
      {initials}
    </div>
  );
};
