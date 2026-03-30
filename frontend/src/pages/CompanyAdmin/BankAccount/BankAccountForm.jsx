import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBankAccount,
  getBankAccountById,
  updateBankAccount,
} from "../../../api/bankAccountApi";
import { useAuth } from "../../../auth/AuthContext";

const initialState = {
  bankName: "",
  bankBranch: "",
  bankAccountName: "",
  bankAccountNo: "",
  bankIfsc: "",
  swiftCode: "",
  panNo: "",
  tanNo: "",
  udyamRegNo: "",
};

const BankAccountForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const data = await getBankAccountById(companyId, id);
        setForm(data);
      } catch (err) {
        setError("Failed to load bank account.");
      } finally {
        setPageLoading(false);
      }
    };

    load();
  }, [id, companyId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (id) {
        await updateBankAccount(companyId, id, form);
      } else {
        await createBankAccount(companyId, form);
      }

      navigate("/company/bank-accounts/all");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <CompanyAdminLayout>
        <div className="p-6 text-center">Loading...</div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow space-y-6">

        <h2 className="text-2xl font-semibold">
          {id ? "Edit Bank Account" : "Add Bank Account"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {Object.keys(initialState).map((key) => (
            <Input
              key={key}
              label={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </button>

      </div>
    </CompanyAdminLayout>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600 capitalize">
      {label.replace(/([A-Z])/g, " $1")}
    </label>
    <input
      {...props}
      className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
    />
  </div>
);

export default BankAccountForm;
