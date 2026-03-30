import React from "react";
import { useNavigate } from "react-router-dom";
import LeaveTypeForm from "../../../components/Leave/LeaveTypeForm";
import { createLeaveType } from "../../../api/leave/leaveType";
import CompanyAdminDashboard from "../../dashboard/companyadminDashboard/CompanyadminDashboard";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useAuth } from "../../../auth/AuthContext";
const LeaveTypeCreate = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const companyId = auth?.companyId;

  const handleSubmit = async (data) => {
    if (!companyId) {
      alert("Company not loaded yet");
      return;
    }

    try {
      const res = await createLeaveType(companyId, data);
      console.log("Response:", res);
      navigate("/leave-types");
    } catch (error) {
      console.error("Create error:", error);
      alert(error.message);
    }
  };

  return (
    <CompanyAdminLayout>
      <LeaveTypeForm onSubmit={handleSubmit} />
    </CompanyAdminLayout>
  );
};

export default LeaveTypeCreate;
