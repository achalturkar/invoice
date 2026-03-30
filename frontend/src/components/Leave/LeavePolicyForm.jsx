import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import { getLeaveTypes } from "../../api/leave/leaveType";

const LeavePolicyForm = ({ initialData, onSubmit, readOnly = false }) => {
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    leaveTypeId: "",
    policyYear: new Date().getFullYear(),
    totalEntitlementDays: 0,
    noticePeriodDays: 0,
    minApprovalLevel: 1,
    rules: "",
    effectiveFrom: "",
    effectiveTo: "",
  });

  /* =============================
     LOAD LEAVE TYPES
  ============================== */
  useEffect(() => {
    if (companyId) {
      loadLeaveTypes();
    }
  }, [companyId]);

  const loadLeaveTypes = async () => {
    try {
      const data = await getLeaveTypes(companyId);
      setLeaveTypes(data);
    } catch (err) {
      console.error("Failed to load leave types", err);
    }
  };

  /* =============================
     PREFILL DATA (EDIT / VIEW)
  ============================== */
  useEffect(() => {
    if (initialData) {
      setFormData({
        leaveTypeId: initialData.leaveTypeId || "",
        policyYear: initialData.policyYear || new Date().getFullYear(),
        totalEntitlementDays: initialData.totalEntitlementDays || 0,
        noticePeriodDays: initialData.noticePeriodDays || 0,
        minApprovalLevel: initialData.minApprovalLevel || 1,
        rules: initialData.rules || "",
        effectiveFrom: initialData.effectiveFrom
          ? initialData.effectiveFrom.slice(0, 10)
          : "",
        effectiveTo: initialData.effectiveTo
          ? initialData.effectiveTo.slice(0, 10)
          : "",
      });
    }
  }, [initialData]);

  /* =============================
     HANDLE CHANGE
  ============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = [
      "policyYear",
      "totalEntitlementDays",
      "noticePeriodDays",
      "minApprovalLevel",
    ];

    setFormData({
      ...formData,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };

  /* =============================
     HANDLE SUBMIT
  ============================== */
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    await onSubmit(formData);
  } catch (err) {
    if (
      err.response?.status === 409 ||
      err.message?.includes("Policy already exists")
    ) {
      const selectedLeaveType = leaveTypes.find(
        (lt) => lt.id === formData.leaveTypeId
      );

      const leaveTypeName = selectedLeaveType
        ? selectedLeaveType.name
        : "Selected Leave Type";

      setError(
        `Policy already present for ${leaveTypeName} (${formData.policyYear})`
      );
    } else {
      setError(err.message || "Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};


  /* =============================
     UI
  ============================== */
  return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl border">

          {/* HEADER */}
          <div className="px-8 py-6 border-b bg-gray-100 rounded-t-2xl">
            <h2 className="text-xl font-semibold text-gray-800">
              {readOnly
                ? "View Leave Policy"
                : initialData
                ? "Edit Leave Policy"
                : "Create Leave Policy"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Configure yearly leave entitlements and rules
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-8 grid md:grid-cols-2 gap-6"
          >
            {error && (
              <div className="md:col-span-2 bg-red-100 text-red-700 px-4 py-2 rounded">
                {error}
              </div>
            )}

            {/* Leave Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Leave Type
              </label>
              <select
                name="leaveTypeId"
                value={formData.leaveTypeId}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map((lt) => (
                  <option key={lt.id} value={lt.id}>
                    {lt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Year */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Policy Year
              </label>
              <input
                type="number"
                name="policyYear"
                value={formData.policyYear}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* Total Entitlement */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Total Entitlement Days
              </label>
              <input
                type="number"
                name="totalEntitlementDays"
                value={formData.totalEntitlementDays}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* Notice Period */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Notice Period Days
              </label>
              <input
                type="number"
                name="noticePeriodDays"
                value={formData.noticePeriodDays}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Min Approval Level */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Minimum Approval Level
              </label>
              <input
                type="number"
                name="minApprovalLevel"
                value={formData.minApprovalLevel}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Effective From */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Effective From
              </label>
              <input
                type="date"
                name="effectiveFrom"
                value={formData.effectiveFrom}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* Effective To */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Effective To
              </label>
              <input
                type="date"
                name="effectiveTo"
                value={formData.effectiveTo || ""}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Rules */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Policy Rules
              </label>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                disabled={readOnly}
                rows="4"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* BUTTON */}
            {!readOnly && (
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Policy"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
 );
};

export default LeavePolicyForm;
