import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getClientById, updateClient } from "../../../api/clientApi";
import { useAuth } from "../../../auth/AuthContext";
import { Save, ArrowLeft } from "lucide-react";

const EditClient = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    webUrl: "",
    gstNo: "",
    panNo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!companyId || !clientId) return;
    loadClient();
  }, [companyId, clientId]);

  const loadClient = async () => {
    try {
      setLoading(true);
      const data = await getClientById(companyId, clientId);
      setForm({
        clientName: data.clientName || "",
        email: data.email || "",
        phone: data.phone || "",
        webUrl: data.webUrl || "",
        gstNo: data.gstNo || "",
        panNo: data.panNo || "",
      });
    } catch (err) {
      setError("Unable to load client details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.clientName || !form.email) {
      setError("Client name and email are required");
      return;
    }

    try {
      setSaving(true);
      await updateClient(companyId, clientId, form);
      navigate(`/clients/view/${clientId}`);
    } catch (err) {
      setError("Failed to update client");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="p-10 text-center text-gray-500">
          Loading client...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">
            Edit Client
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl bg-white rounded-2xl shadow-sm p-6 space-y-6"
        >
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* BASIC INFO */}
          <Section title="Basic Information">
            <Input
              label="Client Name"
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
              type="email"
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              label="Website"
              name="webUrl"
              value={form.webUrl}
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

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </CompanyAdminLayout>
  );
};

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-sm font-semibold text-gray-700 mb-4">
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    />
  </div>
);

export default EditClient;
