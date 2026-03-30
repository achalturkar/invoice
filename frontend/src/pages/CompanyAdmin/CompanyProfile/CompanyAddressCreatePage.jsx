import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyAddressForm from "../../../components/CompanyAdmin/Address/CompanyAddressForm";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { createCompanyAddress } from "../../../api/companyaddressApi";
import { useAuth } from "../../../auth/AuthContext";

const CompanyAddressCreatePage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async (formData) => {
    if (!auth?.companyId) {
      alert("Company ID missing. Please login again.");
      return;
    }

    try {
      await createCompanyAddress(auth.companyId, formData);
      navigate("/company-admin/profile/address");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <CompanyAdminLayout>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Add Company Address
        </h2>

        <CompanyAddressForm onSubmit={handleSubmit} />
      </div>
    </CompanyAdminLayout>
  );
};

export default CompanyAddressCreatePage;
