import React, { useState, useEffect } from "react";

const LeaveTypeForm = ({ initialData, onSubmit, readOnly }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    maxDaysPerYear: 0,
    carryForwardDays: 0,
    requiresApproval: true,
    impactsPayroll: false,
    halfDayAllowed: true,
    negativeBalanceAllowed: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-200">

        {/* Header */}
        <div className="px-8 py-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {readOnly ? "View Leave Type" : "Leave Type Configuration"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure leave rules and payroll behaviour
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Basic Information */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              Basic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Leave Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  disabled={readOnly}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-100"
                  required
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Leave Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={readOnly}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-100"
                  required
                />
              </div>

              {/* Max Days */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Max Days Per Year
                </label>
                <input
                  type="number"
                  name="maxDaysPerYear"
                  value={formData.maxDaysPerYear}
                  onChange={handleChange}
                  disabled={readOnly}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-100"
                />
              </div>

              {/* Carry Forward */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Carry Forward Days
                </label>
                <input
                  type="number"
                  name="carryForwardDays"
                  value={formData.carryForwardDays}
                  onChange={handleChange}
                  disabled={readOnly}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={readOnly}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Rules Section */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              Leave Rules
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              {[
                { name: "requiresApproval", label: "Requires Approval" },
                { name: "impactsPayroll", label: "Impacts Payroll" },
                { name: "halfDayAllowed", label: "Half Day Allowed" },
                { name: "negativeBalanceAllowed", label: "Negative Balance Allowed" },
              ].map((item) => (
                <label
                  key={item.name}
                  className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>

                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name]}
                    onChange={handleChange}
                    disabled={readOnly}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </label>
              ))}

            </div>
          </div>

          {/* Footer Buttons */}
          {!readOnly && (
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Save Leave Type
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default LeaveTypeForm;
