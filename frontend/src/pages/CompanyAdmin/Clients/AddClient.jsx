import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { createClient } from "../../../api/clientApi";
import { getLoggedInUser } from "../../../api/authApi";

const AddClient = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    gstNo: "",
    panNo: "",
    billingAddress: "",
    shippingAddress: "",
    stateCode: "",
    stateName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.clientName) {
      alert("Client name is required");
      return;
    }

    try {
      setSaving(true);

      // 1️⃣ get logged in user
      const user = await getLoggedInUser();

      // 2️⃣ call backend
      await createClient(user.company, {
        ...form,
        stateCode: form.stateCode ? Number(form.stateCode) : null,
      });

      // 3️⃣ redirect to list page
      navigate("/clients");

    } catch (err) {
      console.error(err);
      alert("Failed to add client");
    } finally {
      setSaving(false);
    }
  };

  return (
    <CompanyAdminLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">Add New Client</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INFO */}
          <Section title="Basic Information">
            <Input
              label="Client Name *"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </Section>

          {/* TAX INFO */}
          <Section title="Tax Information">
            <Input
              label="GST Number"
              name="gstNo"
              value={form.gstNo}
              onChange={handleChange}
            />
            <Input
              label="PAN Number"
              name="panNo"
              value={form.panNo}
              onChange={handleChange}
            />
          </Section>

          {/* ADDRESS */}
          <Section title="Address">
            <Textarea
              label="Billing Address"
              name="billingAddress"
              value={form.billingAddress}
              onChange={handleChange}
            />
            <Textarea
              label="Shipping Address"
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleChange}
            />
          </Section>

          {/* STATE */}
          <Section title="GST State">
            <Input
              label="State Name"
              name="stateName"
              value={form.stateName}
              onChange={handleChange}
            />
            <Input
              label="State Code"
              name="stateCode"
              value={form.stateCode}
              onChange={handleChange}
            />
          </Section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/clients")}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Client"}
            </button>
          </div>

        </form>
      </div>
    </CompanyAdminLayout>
  );
};

export default AddClient;

/* ================= COMPONENTS ================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <input
      {...props}
      className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold mb-3 text-gray-700">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);
