import React from "react";
import { useNavigate } from "react-router-dom";

import LeavePolicyForm from "../../../components/Leave/LeavePolicyForm";
import { useAuth } from "../../../auth/AuthContext";
import { createLeavePolicy } from "../../../api/leave/leavePolicy";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

const LeavePolicyCreate = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const handleSubmit = async (data) => {
    if (!companyId) {
      alert("Company not loaded yet");
      return;
    }

    try {
      await createLeavePolicy(companyId, data);
      navigate("/leave-policies");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <CompanyAdminLayout>
      <LeavePolicyForm onSubmit={handleSubmit} />
    </CompanyAdminLayout>
  );
};

export default LeavePolicyCreate;
