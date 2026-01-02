import React, { useState } from "react";
import axios from "axios";
import SuperAdminLayout from "../../../layout/SuperAdminLayout";

const CreateCompany = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    stateCode: "",
    gstNo: "",
    panNo: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await axios.post(
        "http://localhost:8080/super-admin/companies",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      setMsg("✅ Company created successfully");
      setForm({});
    } catch (err) {
      setMsg(err.response?.data || "❌ Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SuperAdminLayout>
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create Company</h2>

      {msg && <p className="mb-4 text-sm">{msg}</p>}

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["name", "Company Name"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["state", "State"],
          ["stateCode", "State Code"],
          ["gstNo", "GST Number"],
          ["panNo", "PAN Number"]
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            placeholder={label}
            value={form[key] || ""}
            onChange={handleChange}
            required={key === "name" || key === "email"}
            className="border px-3 py-2 rounded"
          />
        ))}

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border px-3 py-2 rounded col-span-full"
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white py-2 rounded col-span-full hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
    </SuperAdminLayout>
  );
};

export default CreateCompany;
