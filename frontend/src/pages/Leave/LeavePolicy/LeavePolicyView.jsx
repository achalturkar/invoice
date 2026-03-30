import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeavePolicyForm from "../../../components/Leave/LeavePolicyForm";
import { getLeavePolicyId } from "../../../api/leave/leavePolicy";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useAuth } from "../../../auth/AuthContext";

const LeavePolicyView = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [policyData, setPolicyData] = useState(null);

  useEffect(() => {
    if (companyId && id) loadPolicy();
  }, [companyId, id]);

  const loadPolicy = async () => {
    const data = await getLeavePolicyId(companyId, id);
    setPolicyData(data);
  };

  if (!policyData) return <div>Loading...</div>;

  return (
    <CompanyAdminLayout>
      <LeavePolicyForm
        initialData={policyData}
        readOnly={true}
      />
    </CompanyAdminLayout>
  );
};

export default LeavePolicyView;
