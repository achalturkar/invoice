import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeaveTypeForm from "../../../components/Leave/LeaveTypeForm";
import { getLeaveTypeById, updateLeaveType } from "../../../api/leave/leaveType";
import { useAuth } from "../../../auth/AuthContext";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

const LeaveTypeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getLeaveTypeById(companyId, id);
    setData(res);
  };

  const handleSubmit = async (formData) => {
    await updateLeaveType(companyId, id, formData);
    navigate("/leave-types");
  };

  return (
    <CompanyAdminLayout>
      {
        data && (
          <LeaveTypeForm initialData={data} onSubmit={handleSubmit} />
        )

      }

    </CompanyAdminLayout>

  )
};

export default LeaveTypeEdit;
