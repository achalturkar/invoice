import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useAuth } from "../../../auth/AuthContext";
import {
  getCompanyAddressById,
  updateCompanyAddress,
  deleteCompanyAddress,
} from "../../../api/companyaddressApi";

const CompanyAddressEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const companyId = auth?.companyId;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    addressType: "REGISTERED",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    stateCode: "",
    country: "India",
    pincode: "",
  });

  /* ================= LOAD ================= */
  useEffect(() => {
    if (!companyId || !id) return;

    const load = async () => {
      try {
        const data = await getCompanyAddressById(companyId, id);

        setForm({
          addressType: data.addressType || "REGISTERED",
          addressLine1: data.addressLine1 || "",
          addressLine2: data.addressLine2 || "",
          city: data.city || "",
          district: data.district || "",
          state: data.state || "",
          stateCode: data.stateCode || "",
          country: data.country || "India",
          pincode: data.pincode || "",
        });
      } catch (err) {
        alert("Failed to load address");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [companyId, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId) {
      alert("Company info not loaded");
      return;
    }

    setSaving(true);
    try {
      await updateCompanyAddress(companyId, id, {
        ...form,
        stateCode: Number(form.stateCode) || null,
        pincode: String(form.pincode),
      });
      alert("Address updated");
      navigate("/company-admin/profile/address");
    } catch {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!companyId) return;
    if (!window.confirm("Delete this address?")) return;

    try {
      await deleteCompanyAddress(companyId, id);
      alert("Address deleted");
      navigate("/company-admin/profile/address");
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= STATES ================= */
  if (!companyId) {
    return (
      <CompanyAdminLayout>
        <div className="text-center py-10 text-gray-500">
          Loading user info...
        </div>
      </CompanyAdminLayout>
    );
  }

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="text-center py-10">Loading address...</div>
      </CompanyAdminLayout>
    );
  }

  /* ================= UI ================= */
  return (
    <CompanyAdminLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">Edit Company Address</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

          <Select
            label="Address Type"
            name="addressType"
            value={form.addressType}
            onChange={handleChange}
          >
            <option value="REGISTERED">Registered</option>
            <option value="BILLING">Billing</option>
            <option value="SHIPPING">Shipping</option>
          </Select>

          <Input label="Address Line 1" name="addressLine1" value={form.addressLine1} onChange={handleChange} />
          <Input label="Address Line 2" name="addressLine2" value={form.addressLine2} onChange={handleChange} />
          <Input label="City" name="city" value={form.city} onChange={handleChange} />
          <Input label="District" name="district" value={form.district} onChange={handleChange} />
          <Input label="State" name="state" value={form.state} onChange={handleChange} />
          <Input label="State Code" name="stateCode" value={form.stateCode} onChange={handleChange} />
          <Input label="Country" name="country" value={form.country} onChange={handleChange} />
          <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />

          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/company-admin/profile/address")}
              className="border px-4 py-2 rounded"
            >
              ← Back
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDelete}
                className="border border-red-500 text-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-60"
              >
                {saving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </CompanyAdminLayout>
  );
};

export default CompanyAddressEditPage;

/* ================= UI ================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <input {...props} className="w-full border rounded px-3 py-2 mt-1" />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <select {...props} className="w-full border rounded px-3 py-2 mt-1">
      {children}
    </select>
  </div>
);
