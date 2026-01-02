import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getLoggedInUser } from "../../../api/authApi";
import { getClientById, updateClient } from "../../../api/clientApi";

const EditClient = () => {
  const { id } = useParams(); // clientId
  const navigate = useNavigate();

  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    gstNo: "",
    billingAddress: "",
    shippingAddress: "",
    stateCode: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getLoggedInUser();
        setCompanyId(user.company);

        const client = await getClientById(user.company, id);

        setForm({
          clientName: client.clientName || "",
          email: client.email || "",
          phone: client.phone || "",
          gstNo: client.gstNo || "",
          billingAddress: client.billingAddress || "",
          shippingAddress: client.shippingAddress || "",
          stateCode: client.stateCode || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load client");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateClient(companyId, id, {
        ...form,
        stateCode: Number(form.stateCode),
      });

      alert("Client updated successfully ✅");
      navigate("/clients");
    } catch (err) {
      console.error(err);
      alert("Failed to update client");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="flex justify-center items-center h-40 text-gray-500">
          Loading client details...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Edit Client
            </h2>
            <p className="text-sm text-gray-500">
              Update client information
            </p>
          </div>

          <button
            onClick={() => navigate("/clients")}
            className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

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

          {/* TAX */}
          <Section title="Tax Information">
            <Input
              label="GST Number"
              name="gstNo"
              value={form.gstNo}
              onChange={handleChange}
            />
            <Input
              label="State Code"
              name="stateCode"
              value={form.stateCode}
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

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/clients")}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Client"}
            </button>
          </div>

        </form>
      </div>
    </CompanyAdminLayout>
  );
};

export default EditClient;

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold mb-4 text-gray-700">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <input
      {...props}
      className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="text-xs text-gray-600">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-200"
    />
  </div>
);
