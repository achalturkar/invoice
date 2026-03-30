

import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBankAccountById,
  updateBankAccount,
} from "../../../api/bankAccountApi";
import { useAuth } from "../../../auth/AuthContext";

const BankAccountDetails = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [bank, setBank] = useState(null);
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const companyId = auth?.companyId;

  useEffect(() => {
    loadBank();
  }, [companyId]);

  const loadBank = async () => {
    try {
      const data = await getBankAccountById(companyId);
      setBank(data);
      setForm(data);
    } catch (err) {
      setError("Failed to load bank account");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      await updateBankAccount(companyId, form);
      setEditMode(false);
      loadBank();
    } catch (err) {
      setError("Update failed");
    }
  };

  if (loading)
    return (
      <CompanyAdminLayout>
        <div className="p-6 text-center">Loading...</div>
      </CompanyAdminLayout>
    );

  if (error)
    return (
      <CompanyAdminLayout>
        <div className="p-6 text-red-500 text-center">{error}</div>
      </CompanyAdminLayout>
    );

  return (
    <CompanyAdminLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Bank Account Details
          </h2>

          <div className="flex gap-3">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditMode(false);
                    setForm(bank);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>
            )}

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium
              ${
                bank.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : bank.status === "INACTIVE"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {bank.status}
          </span>
        </div>

        {/* Fields */}
        <div className="grid md:grid-cols-2 gap-6">

          <Field
            label="Bank Name"
            name="bankName"
            value={form.bankName}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="Branch"
            name="bankBranch"
            value={form.bankBranch}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="Account Holder"
            name="bankAccountName"
            value={form.bankAccountName}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="Account Number"
            name="bankAccountNo"
            value={form.bankAccountNo}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="IFSC Code"
            name="bankIfsc"
            value={form.bankIfsc}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="SWIFT Code"
            name="swiftCode"
            value={form.swiftCode}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="PAN No"
            name="panNo"
            value={form.panNo}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="TAN No"
            name="tanNo"
            value={form.tanNo}
            editMode={editMode}
            onChange={handleChange}
          />

          <Field
            label="Udyam Reg No"
            name="udyamRegNo"
            value={form.udyamRegNo}
            editMode={editMode}
            onChange={handleChange}
          />
        </div>
      </div>
    </CompanyAdminLayout>
  );
};

const Field = ({ label, name, value, editMode, onChange }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    {editMode ? (
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <div className="mt-1 text-sm font-medium bg-gray-50 p-2 rounded-lg">
        {value || "-"}
      </div>
    )}
  </div>
);

export default BankAccountDetails;
