import React, { useState } from "react";
import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { createHoliday } from "../../../api/leave/holiday";

export default function AddHoliday() {

  const { auth } = useAuth();
  const navigate = useNavigate();

  const companyId = auth?.companyId;
  const userId = auth?.id;

  const [form, setForm] = useState({
    holidayName: "",
    holidayDate: "",
    holidayCategory: "NATIONAL"
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createHoliday(companyId, userId, form);

      navigate("/employee/leave/holiday");

    } catch (err) {

      alert("Failed to create holiday");

    }

  };

  return (

    <EmployeeLayout>

      <div className="max-w-xl mx-auto bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-4">
          Add Holiday
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Holiday Name"
            value={form.holidayName}
            onChange={(e) =>
              setForm({ ...form, holidayName: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="date"
            value={form.holidayDate}
            onChange={(e) =>
              setForm({ ...form, holidayDate: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <select
            value={form.holidayCategory}
            onChange={(e) =>
              setForm({ ...form, holidayCategory: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="NATIONAL">National</option>
            <option value="OPTIONAL">Optional</option>
            <option value="COMPANY">Company</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            Create Holiday
          </button>

        </form>

      </div>

    </EmployeeLayout>

  );
}
