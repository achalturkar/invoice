import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeavePolicyForm from "../../../components/Leave/LeavePolicyForm";
import {
  getLeavePolicyId,
  updateLeavePolicy,
} from "../../../api/leave/leavePolicy";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useAuth } from "../../../auth/AuthContext";

const LeavePolicyEdit = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const companyId = auth?.companyId;
  const navigate = useNavigate();

  const [policyData, setPolicyData] = useState(null);

  useEffect(() => {
    if (companyId && id) loadPolicy();
  }, [companyId, id]);

  const loadPolicy = async () => {
    const data = await getLeavePolicyId(companyId, id);
    setPolicyData(data);
  };

  const handleUpdate = async (data) => {
    try {
      await updateLeavePolicy(id, companyId, data);
      navigate("/leave-policies");
    } catch (err) {
      alert(err.message);
    }
  };

  if (!policyData) return <div>Loading...</div>;

  return (
    <CompanyAdminLayout>
      <LeavePolicyForm
        initialData={policyData}
        onSubmit={handleUpdate}
      />
    </CompanyAdminLayout>
  );
};

export default LeavePolicyEdit;
