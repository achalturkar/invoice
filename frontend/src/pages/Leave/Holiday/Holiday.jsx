import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";
import { useAuth } from "../../../auth/AuthContext";

import {
  getAllHolidays,
  deleteHoliday
} from "../../../api/leave/holiday";

import { getCandidateByUserId } from "../../../api/employeeApi";
import { formatDate } from "../../../utils/dateUtils";

export default function Holiday() {

  const { auth } = useAuth();
  const navigate = useNavigate();

  const companyId = auth?.companyId;
  const userId = auth?.id;

  const [employeeId, setEmployeeId] = useState(null);

  const [year, setYear] = useState(new Date().getFullYear());

  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* ================= LOAD EMPLOYEE ================= */

  useEffect(() => {

    const loadEmployee = async () => {

      if (!companyId || !userId) return;

      try {

        const employee = await getCandidateByUserId(companyId, userId);

        console.log("Employee:", employee);

        setEmployeeId(employee?.id);

      } catch (err) {

        console.error(err);
        setError("Failed to load employee");

      }

    };

    loadEmployee();

  }, [companyId, userId]);



  /* ================= FETCH HOLIDAYS ================= */

  useEffect(() => {

    if (companyId && employeeId) {
      fetchHolidays();
    }

  }, [companyId, employeeId, year]);


  const fetchHolidays = async () => {

    try {

      setLoading(true);

      const data = await getAllHolidays(companyId, year);

      setHolidays(data || []);

    } catch (err) {

      console.error(err);
      setError("Failed to load holidays");

    } finally {

      setLoading(false);

    }

  };


  /* ================= DELETE HOLIDAY ================= */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this holiday?")) return;

    try {

      await deleteHoliday(companyId, id);

      fetchHolidays();

    } catch (err) {

      alert("Delete failed");

    }

  };


  /* ================= CALENDAR EVENTS ================= */

  const events = holidays.map((holiday) => ({

    id: holiday.id,
    title: holiday.holidayName,
    start: holiday.holidayDate,

    color:
      holiday.holidayCategory === "NATIONAL"
        ? "#ef4444"
        : holiday.holidayCategory === "OPTIONAL"
        ? "#f59e0b"
        : "#6366f1",

  }));


  return (
    <EmployeeLayout>

      <div className="max-w-7xl mx-auto bg-white border rounded-2xl shadow-sm p-6">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Holiday Calendar
            </h2>

            <p className="text-sm text-gray-500">
              Company & National Holidays
            </p>

          </div>

          <button
            onClick={() => navigate("/employee/add-holiday")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            Add Holiday
          </button>

        </div>


        {/* YEAR FILTER */}

        <div className="mb-6">

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>

        </div>


        {/* CALENDAR */}

        <div className="bg-white rounded-xl border p-4 mb-8">

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            events={events}
          />

        </div>


        {/* TABLE */}

        <div>

          <h3 className="font-semibold mb-4">
            Holiday List
          </h3>

          {loading ? (

            <p>Loading...</p>

          ) : (

            <table className="w-full text-sm border rounded-xl overflow-hidden">

              <thead className="bg-gray-50 text-gray-600">

                <tr>
                  <th className="py-3 text-left px-3">Holiday</th>
                  <th className="text-left px-3">Date</th>
                  <th className="text-left px-3">Category</th>
                  <th className="text-left px-3">Action</th>
                </tr>

              </thead>

              <tbody>

                {holidays.map((holiday) => (

                  <tr key={holiday.id} className="border-t hover:bg-gray-50">

                    <td className="py-3 px-3">
                      {holiday.holidayName}
                    </td>

                    <td className="px-3">
                      {formatDate(holiday.holidayDate)}
                    </td>

                    <td className="px-3">
                      {holiday.holidayCategory}
                    </td>

                    <td className="px-3">

                      <button
                        onClick={() => handleDelete(holiday.id)}
                        className="text-red-500 text-xs"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </EmployeeLayout>
  );
}
