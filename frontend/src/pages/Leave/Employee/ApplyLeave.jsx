import React, { useEffect, useState } from "react";
import { Upload, Info, HelpCircle } from "lucide-react";

import EmployeeLayout from "../../../layout/EmployeeLayout/EmployeeLayout";
import { useAuth } from "../../../auth/AuthContext";

import { getCandidateByUserId } from "../../../api/employeeApi";
import { getAllEmployeeBalances } from "../../../api/leave/employeeBalance";
import { createLeaveRequest, uploadLeaveFile } from "../../../api/leave/leaveRequest";

export default function ApplyLeave() {

  const { auth } = useAuth();

  const companyId = auth?.companyId;
  const userId = auth?.id;
  const year = new Date().getFullYear();

  const [employee, setEmployee] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [leaveBalances, setLeaveBalances] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [totalDays, setTotalDays] = useState(0);

  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    leaveTypeId: "",
    fromDate: "",
    toDate: "",
    halfDay: false,
    reason: "",
    contact: ""
  });

  // ===============================
  // Load Employee
  // ===============================

  useEffect(() => {

    if (companyId && userId) {
      loadEmployee();
    }

  }, [companyId, userId]);

  const loadEmployee = async () => {

    try {

      const data = await getCandidateByUserId(companyId, userId);

      setEmployee(data);
      setEmployeeId(data.id);

    } catch (err) {

      console.error(err);

    }

  };

  // ===============================
  // Load Leave Balances
  // ===============================

  useEffect(() => {

    if (employeeId) {

      fetchBalances();

    }

  }, [employeeId]);

  const fetchBalances = async () => {

    try {

      setLoading(true);

      const data = await getAllEmployeeBalances(
        companyId,
        employeeId,
        year
      );

      setLeaveBalances(data || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  // ===============================
  // Calculate Leave Days
  // ===============================

  useEffect(() => {

    if (form.fromDate && form.toDate) {

      const start = new Date(form.fromDate);
      const end = new Date(form.toDate);

      const diff = (end - start) / (1000 * 60 * 60 * 24) + 1;

      const days = form.halfDay ? 0.5 : diff;

      setTotalDays(days);

    }

  }, [form.fromDate, form.toDate, form.halfDay]);

  // ===============================
  // Selected Leave Balance
  // ===============================

  const selectedBalance = leaveBalances.find(
    (b) => b.leaveTypeId === form.leaveTypeId
  );

  // ===============================
  // Form Change
  // ===============================

  const handleChange = (field, value) => {

    setForm((prev) => ({
      ...prev,
      [field]: value
    }));

  };

  // ===============================
  // Submit Leave Request
  // ===============================

  const submitLeave = async (e) => {

    e.preventDefault();

    if (!form.leaveTypeId) {
      setMessage("Leave type is required *");
      return;
    }

    if (!form.fromDate || !form.toDate) {
      setMessage("Leave dates are required *");
      return;
    }

    if (!form.reason) {
      setMessage("Reason is required *");
      return;
    }

    try {

      setLoading(true);

      let filePath = null;

      // ✅ Upload file FIRST
      if (file) {
        filePath = await uploadLeaveFile(file);
      }

      // ✅ Sick leave validation
      const selected = leaveBalances.find(
        (b) => b.leaveTypeId === form.leaveTypeId
      );

      if (
        selected?.leaveName?.toLowerCase().includes("sick") &&
        totalDays > 2 &&
        !filePath
      ) {
        throw new Error("Medical certificate required for sick leave > 2 days *");
      }

      // ✅ Final JSON payload
      const payload = {
        leaveTypeId: form.leaveTypeId,
        fromDate: form.fromDate,
        toDate: form.toDate,
        halfDay: form.halfDay,
        reason: form.reason,
        contact: form.contact,
        filePath: filePath
      };

      await createLeaveRequest(companyId, employeeId, payload);

      setMessage("Leave request submitted successfully ✅");

      setForm({
        leaveTypeId: "",
        fromDate: "",
        toDate: "",
        halfDay: false,
        reason: "",
        contact: ""
      });

      setFile(null);
      setTotalDays(0);

      fetchBalances();

    } catch (err) {

      setMessage(err.message || "Failed to submit leave request");

    } finally {

      setLoading(false);

    }

  };



  return (

    <EmployeeLayout>

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {/* MAIN FORM */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-8">

          <h2 className="text-xl font-semibold mb-6">
            Apply For Leave
          </h2>

          {message && (
            <div className="mb-4 text-sm text-indigo-600">
              {message}
            </div>
          )}

          {/* Leave Type */}

          <div className="mb-6">

            <label className="text-sm font-medium">
              Leave Type <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-row items-center justify-between">

              <select
                value={form.leaveTypeId}
                onChange={(e) =>
                  handleChange("leaveTypeId", e.target.value)
                }
                className="mt-1 w-1/2 border rounded-lg px-3 py-2"
              >

                <option value="">
                  Select Leave
                </option>

                {leaveBalances.map((balance) => (

                  <option
                    key={balance.leaveTypeId}
                    value={balance.leaveTypeId}
                  >

                    {balance.leaveName}

                  </option>

                ))}

              </select>


              {selectedBalance && (

                <div className="text-sm text-gray-600 mt-2">

                  Remaining :
                  <b> {selectedBalance.remainingDays}</b>

                  {" "} / {" "}

                  Total :
                  <b> {selectedBalance.openingBalance}</b>

                </div>

              )}

            </div>

          </div>

          {/* Dates */}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                From Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.fromDate}
                onChange={(e) =>
                  handleChange("fromDate", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                To Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.toDate}
                onChange={(e) =>
                  handleChange("toDate", e.target.value)
                }
                className="border rounded-lg px-3 py-2"
              />
            </div>

          </div>

          {/* Half Day */}

          <div className="flex items-center gap-3 mb-6">

            <input
              type="checkbox"
              checked={form.halfDay}
              onChange={() =>
                handleChange("halfDay", !form.halfDay)
              }
            />

            <span>Half Day Leave</span>

          </div>

          {/* Total Days */}

          <div className="mb-6 text-sm">

            Total Days : <b>{totalDays}</b>

          </div>

          {/* Reason */}

          <label className="text-sm font-medium">
            Reason<span className="text-red-500">*</span>
          </label>

          <textarea
            rows="4"
            placeholder="Reason"
            value={form.reason}
            onChange={(e) =>
              handleChange("reason", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 mb-6"
          />

          {/* Contact During Leave */}

          <input
            type="text"
            placeholder="Contact during leave"
            value={form.contact}
            onChange={(e) =>
              handleChange("contact", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 mb-6"
          />

          {/* File Upload */}

          <div className="mb-6">

            <label className="text-sm font-medium flex items-center gap-2">

              <Upload size={16} />

              Attachment (Optional)

            </label>

            {file && (
              <p className="text-sm text-green-600 mt-2">
                Selected: {file.name}
              </p>
            )}


            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="mt-2"
            />


          </div>

          {/* Manager */}

          <div className="flex flex-col  md:flex-row  justify-between ">

            <div className=" w-1/2 bg-gray-50 p-2 rounded-xl mb-2">

              <p className="text-sm text-gray-600">
                Reporting Manager
              </p>

              <p className="font-semibold">

                {employee?.managerName || "Not Assigned"}

              </p>

            </div>

            {/* Team Lead */}

            <div className="w-1/2 bg-gray-50 p-2 rounded-xl mb-3">

              <p className="text-sm text-gray-600">
                Team Lead
              </p>

              <p className="font-semibold">

                {employee?.teamLeadName || "Not Assigned"}

              </p>

            </div>
          </div>


          <button
            onClick={submitLeave}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >

            {loading ? "Submitting..." : "Submit Leave Request"}

          </button>

        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-6">

          <div className="bg-white p-5 rounded-2xl border">

            <h3 className="font-semibold mb-2">
              Leave Policy
            </h3>

            <p className="text-sm text-gray-500">
              Sick leave more than 2 days requires medical certificate.
            </p>

          </div>

          <div className="bg-indigo-600 text-white p-5 rounded-2xl">

            <h3 className="font-semibold mb-2">
              Need Help?
            </h3>

            <p className="text-sm">
              Contact HR for leave related queries.
            </p>

          </div>

        </div>

      </div>

    </EmployeeLayout>

  );

}




