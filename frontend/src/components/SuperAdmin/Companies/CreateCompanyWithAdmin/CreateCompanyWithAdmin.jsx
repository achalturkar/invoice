import React, { useState } from "react";
import axios from "axios";

const CreateCompanyWithAdmin = () => {
  const [form, setForm] = useState({});
  const token = localStorage.getItem("accessToken");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/super-admin/create-company-with-admin",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Company & Admin created");
    } catch (err) {
      alert(err.response?.data || "Failed");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <h2 className="col-span-full text-xl font-semibold">
        Company Details
      </h2>

      <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
      <input name="companyEmail" placeholder="Company Email" onChange={handleChange} required />
      <input name="companyPhone" placeholder="Company Phone" onChange={handleChange} />
      <input name="state" placeholder="State" onChange={handleChange} />
      <input name="stateCode" placeholder="State Code" onChange={handleChange} />
      <input name="gstNo" placeholder="GST No" onChange={handleChange} />
      <input name="panNo" placeholder="PAN No" onChange={handleChange} />

      <h2 className="col-span-full text-xl font-semibold mt-4">
        Company Admin Details
      </h2>

      <input name="adminName" placeholder="Admin Name" onChange={handleChange} required />
      <input name="adminEmail" placeholder="Admin Email" onChange={handleChange} required />
      <input name="adminPhone" placeholder="Admin Phone" onChange={handleChange} />
      <input name="adminPassword" type="password" placeholder="Admin Password" onChange={handleChange} required />

      <button className="col-span-full bg-indigo-600 text-white py-2 rounded">
        Create Company & Admin
      </button>
    </form>
  );
};

export default CreateCompanyWithAdmin;
