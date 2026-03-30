import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { createClient } from "../../../api/clientApi";
import { useAuth } from "../../../auth/AuthContext";

const AddClient = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    gstNo: "",
    panNo: "",
    webUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.clientName.trim()) {
      setError("Client name is required");
      return;
    }

    try {
      setLoading(true);
      const client = await createClient(auth.companyId, form);

      // 👉 Redirect to add address (mandatory step)
      navigate(`/clients/${client.id}/addresses/new`);
    } catch (err) {
      setError("Failed to create client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyAdminLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Client
          </h2>
          <p className="text-sm text-gray-500">
            Create client profile before adding billing or shipping addresses
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* CLIENT NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              placeholder="ABC Technologies Pvt Ltd"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="accounts@company.com"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* GST + PAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">GST Number</label>
              <input
                type="text"
                name="gstNo"
                value={form.gstNo}
                onChange={handleChange}
                placeholder="27ABCDE1234F1Z5"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">PAN Number</label>
              <input
                type="text"
                name="panNo"
                value={form.panNo}
                onChange={handleChange}
                placeholder="ABCDE1234F"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* WEBSITE */}
          <div>
            <label className="block text-sm text-gray-700">Website</label>
            <input
              type="text"
              name="webUrl"
              value={form.webUrl}
              onChange={handleChange}
              placeholder="https://company.com"
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/clients")}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Save & Add Address →"}
            </button>
          </div>

        </form>
      </div>
    </CompanyAdminLayout>
  );
};

export default AddClient;
