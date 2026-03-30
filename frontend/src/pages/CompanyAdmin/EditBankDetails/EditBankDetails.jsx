// import React,{ useEffect, useState } from "react";
// import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
// import { getLoggedInUser } from "../../../api/authApi";
// import { getBankDetails, saveBankDetails } from "../../../api/bankAccountApi";
// import { useNavigate } from "react-router-dom";

// const EditBankDetails = () => {
//   const [form, setForm] = useState({});
//   const [companyId, setCompanyId] = useState(null);

//   const navigate= useNavigate();

//   useEffect(() => {
//     const load = async () => {
//       const user = await getLoggedInUser();
//       setCompanyId(user.company);
//       const data = await getBankDetails(user.company);
//       if (data) setForm(data);
//     };
//     load();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSave = async () => {
//     await saveBankDetails(companyId, form);
//     alert("Bank details saved successfully ✅");
//     navigate("/company-admin/profile")
//   };

//   return (
//     <CompanyAdminLayout>
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
//         <h2 className="text-xl font-bold">Bank Details</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input name="bankName" label="Bank Name" value={form.bankName} onChange={handleChange} />
//           <Input name="bankBranch" label="Branch" value={form.bankBranch} onChange={handleChange} />
//           <Input name="bankAccountName" label="Account Holder Name" value={form.bankAccountName} onChange={handleChange} />
//           <Input name="bankAccountNo" label="Account Number" value={form.bankAccountNo} onChange={handleChange} />
//           <Input name="bankIfsc" label="IFSC Code" value={form.bankIfsc} onChange={handleChange} />
//           <Input name="swiftCode" label="SWIFT Code" value={form.swiftCode} onChange={handleChange} />
//           <Input name="panNo" label="PAN No" value={form.panNo} onChange={handleChange} />
//           <Input name="tanNo" label="TAN No" value={form.tanNo} onChange={handleChange} />
//           <Input name="udyamRegNo" label="Udyam Registration No" value={form.udyamRegNo} onChange={handleChange} />
//         </div>

//         <button
//           onClick={handleSave}
//           className="bg-green-600 text-white px-6 py-2 rounded-lg"
//         >
//           Save Bank Details
//         </button>
//       </div>
//     </CompanyAdminLayout>
//   );
// };

// const Input = ({ label, ...props }) => (
//   <div>
//     <label className="text-xs text-gray-500">{label}</label>
//     <input {...props} className="w-full border rounded px-3 py-2 text-sm" />
//   </div>
// );

// export default EditBankDetails;
