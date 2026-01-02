// import React, { useEffect, useState } from "react";
// import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
// import { getLoggedInUser } from "../../../api/authApi";
// import { getCompanyById, updateCompanyById } from "../../../api/companyApi";
// import { useNavigate } from "react-router-dom";

// const EditCompanyProfile = () => {
//   const [companyId, setCompanyId] = useState(null);
//   const [form, setForm] = useState(null);
//   const [files, setFiles] = useState({
//     logo: null,
//     stamp: null,
//     sign: null,
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const user = await getLoggedInUser();
//         setCompanyId(user.company);
//         setForm(await getCompanyById(user.company));
//       } catch {
//         alert("Session expired");
//       }
//     };
//     loadData();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleFileChange = (e) =>
//     setFiles({ ...files, [e.target.name]: e.target.files[0] });

//   const handleSubmit = async () => {
//     await updateCompanyById(companyId, form);
//     alert("Company profile updated successfully");
//     navigate("/company-admin/profile")
    
//   };

//   if (!form) return <p>Loading...</p>;

//   return (
//     <CompanyAdminLayout>
//       <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6 space-y-8">

//         <h2 className="text-2xl font-bold text-gray-800">
//           Edit Company Profile
//         </h2>

//         {/* BASIC INFO */}
//         <Section title="Basic Information">
//           <Input name="name" label="Company Name" value={form.name} onChange={handleChange} />
//           <Input name="email" label="Email" value={form.email} onChange={handleChange} />
//           <Input name="phone" label="Phone" value={form.phone} onChange={handleChange} />
//           <Input name="webUrl" label="Website" value={form.webUrl} onChange={handleChange} />
//           <Textarea name="address" label="Address" value={form.address} onChange={handleChange} />
//         </Section>

//         {/* LEGAL INFO */}
//         <Section title="Legal Information">
//           <Input name="gstNo" label="GST Number" value={form.gstNo} onChange={handleChange} />
//           <Input name="panNo" label="PAN Number" value={form.panNo} onChange={handleChange} />
//           <Input name="state" label="State" value={form.state} onChange={handleChange} />
//           <Input name="stateCode" label="State Code" value={form.stateCode} onChange={handleChange} />
//         </Section>

//         {/* FILE UPLOAD */}
//         <Section title="Branding & Authorization">
//           <FileInput label="Company Logo" name="logo" onChange={handleFileChange} />
//           <FileInput label="Company Stamp" name="stamp" onChange={handleFileChange} />
//           <FileInput label="Authorized Signature" name="sign" onChange={handleFileChange} />
//         </Section>

//         {/* ACTION */}
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"

//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </CompanyAdminLayout>
//   );
// };

// /* =================== REUSABLE COMPONENTS =================== */

// const Section = ({ title, children }) => (
//   <div>
//     <h3 className="text-sm font-semibold text-gray-700 mb-4">
//       {title}
//     </h3>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {children}
//     </div>
//   </div>
// );

// const Input = ({ label, ...props }) => (
//   <div>
//     <label className="block text-xs text-gray-500 mb-1">{label}</label>
//     <input
//       {...props}
//       className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// );

// const Textarea = ({ label, ...props }) => (
//   <div className="md:col-span-2">
//     <label className="block text-xs text-gray-500 mb-1">{label}</label>
//     <textarea
//       {...props}
//       rows="3"
//       className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// );

// const FileInput = ({ label, ...props }) => (
//   <div>
//     <label className="block text-xs text-gray-500 mb-1">{label}</label>
//     <input
//       type="file"
//       {...props}
//       className="w-full text-sm"
//     />
//   </div>
// );

// export default EditCompanyProfile;

import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getLoggedInUser } from "../../../api/authApi";
import {
  getCompanyById,
  updateCompanyById,
  uploadCompanyImage,
} from "../../../api/companyApi";
import ImageUploadBox from "../ImageUploadBox/ImageUploadBox";

/* ===================== MAIN COMPONENT ===================== */

const EditCompanyProfile = () => {
  const [companyId, setCompanyId] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getLoggedInUser();
        setCompanyId(user.company);
        const company = await getCompanyById(user.company);
        setForm(company);
      } catch (err) {
        console.error(err);
        alert("Failed to load company profile");
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateCompanyById(companyId, form);
      alert("Company profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (type, file) => {
    const updatedCompany = await uploadCompanyImage(companyId, type, file);
    setForm(updatedCompany); // refresh image URLs
  };

  if (!form) {
    return (
      <CompanyAdminLayout>
        <div className="flex justify-center items-center h-40 text-gray-500">
          Loading company profile...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow space-y-10">

        <h2 className="text-xl font-bold text-gray-800">
          Edit Company Profile
        </h2>

        {/* BASIC INFORMATION */}
        <Section title="Basic Information">
          <Input
            name="name"
            label="Company Name"
            value={form.name || ""}
            onChange={handleChange}
          />
          <Input
            name="email"
            label="Email"
            value={form.email || ""}
            onChange={handleChange}
          />
          <Input
            name="phone"
            label="Phone"
            value={form.phone || ""}
            onChange={handleChange}
          />
          <Input
            name="webUrl"
            label="Website"
            value={form.webUrl || ""}
            onChange={handleChange}
          />
          <Textarea
            name="address"
            label="Address"
            value={form.address || ""}
            onChange={handleChange}
          />
        </Section>

        {/* LEGAL DETAILS */}
        <Section title="Legal Details">
          <Input
            name="gstNo"
            label="GST Number"
            value={form.gstNo || ""}
            onChange={handleChange}
          />
          <Input
            name="panNo"
            label="PAN Number"
            value={form.panNo || ""}
            onChange={handleChange}
          />
          <Input
            name="state"
            label="State"
            value={form.state || ""}
            onChange={handleChange}
          />
          <Input
            name="stateCode"
            label="State Code"
            value={form.stateCode || ""}
            onChange={handleChange}
          />
        </Section>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>

        {/* IMAGE UPLOADS */}
        <Section title="Branding & Authorization">
          <ImageUploadBox
            label="Company Logo"
            type="Logo"
            imageUrl={form.logoUrl}
            onUpload={(file) => handleUpload("logo", file)}
          />
          <ImageUploadBox
            label="Company Stamp"
            type="Stamp"
            imageUrl={form.stampUrl}
            onUpload={(file) => handleUpload("stamp", file)}
          />
          <ImageUploadBox
            label="Authorized Signature"
            type="Signature"
            imageUrl={form.signUrl}
            onUpload={(file) => handleUpload("sign", file)}
          />
        </Section>

      </div>
    </CompanyAdminLayout>
  );
};

export default EditCompanyProfile;

/* ===================== REUSABLE UI COMPONENTS ===================== */

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
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
      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="md:col-span-2">
    <label className="text-xs text-gray-500">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
    />
  </div>
);
