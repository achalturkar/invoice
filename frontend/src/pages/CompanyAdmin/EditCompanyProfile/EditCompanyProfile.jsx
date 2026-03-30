import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getLoggedInUser } from "../../../api/authApi";
import {
  getCompanyById,
  updateCompanyById,
} from "../../../api/companyApi";
import { useNavigate } from "react-router-dom";
import LocationForm from "../../../components/common/LocationForm/LocationForm";
import { useAuth } from "../../../auth/AuthContext";

const EditCompanyProfile = () => {
  const [companyId, setCompanyId] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const {auth} =useAuth();

  useEffect(() => {
    const load = async () => {
      // const user = await getLoggedInUser();
      setCompanyId(auth?.companyId);

      const company = await getCompanyById(auth?.companyId);
      setForm(company);
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        name: form.name,
        companyCode: form.companyCode,
        email: form.email,
        phone: form.phone,
        webUrl: form.webUrl,
        address: form.address,
        gstNo: form.gstNo,
        panNo: form.panNo,
        lutNo: form.lutNo,
        cinNo : form.cinNo,
        state: form.state,
        stateCode: form.stateCode,
      };

      await updateCompanyById(companyId, payload);
      alert("Company profile updated successfully ✅");
      navigate("/company-admin/profile");
    } catch {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return (
      <CompanyAdminLayout>
        <div className="flex justify-center items-center h-60 text-gray-500">
          Loading company profile...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8 space-y-10">

        {/* HEADER */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Company Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your organization’s master information used across invoices and reports
          </p>
        </div>

        {/* BASIC INFO */}
        <Section title="Company Information">
          <Input
            name="name"
            label="Company Name"
            value={form.name || ""}
            onChange={handleChange}
          />

          {/* COMPANY CODE – SPECIAL UX */}
          <div>
            <label className="text-xs text-gray-500">Company Code</label>

            <input
              name="companyCode"
              value={form.companyCode || ""}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2.5 text-sm font-semibold tracking-wide focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <div className="mt-2 flex items-start gap-2">
              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                Invoice
              </span>
              <p className="text-xs text-red-500 leading-relaxed">
                This code will be displayed on all invoices and bills
                
                Use a short, unique identifier (e.g. BHV, ACME, INFRA01).
              </p>
            </div>
          </div>

          <Input name="email" label="Email" value={form.email || ""} onChange={handleChange} />
          <Input name="phone" label="Phone" value={form.phone || ""} onChange={handleChange} />
          <Input name="webUrl" label="Website" value={form.webUrl || ""} onChange={handleChange} />
          <Textarea name="address" label="Registered Address" value={form.address || ""} onChange={handleChange} />
        </Section>

        {/* LEGAL */}
        <Section title="Legal & Tax Information">
          <Input name="gstNo" label="GST Number" value={form.gstNo || ""} onChange={handleChange} />
          <Input name="panNo" label="PAN Number" value={form.panNo || ""} onChange={handleChange} />
          <Input name="lutNo" label="LUT Number" value={form.lutNo || ""} onChange={handleChange} />
          <Input name="cinNo" label="CIN Number" value={form.cinNo || ""} onChange={handleChange} />
          <Input name="state" label="State" value={form.state || ""} onChange={handleChange} />
          <Input name="stateCode" label="State Code" value={form.stateCode || ""} onChange={handleChange} />
        </Section>

        {/* <LocationForm/> */}

        {/* ACTION */}
        <div className="sticky bottom-0 bg-white border-t pt-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </CompanyAdminLayout>
  );
};

export default EditCompanyProfile;


/* ===================== UI COMPONENTS ===================== */

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="text-xs text-gray-500">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>
);
