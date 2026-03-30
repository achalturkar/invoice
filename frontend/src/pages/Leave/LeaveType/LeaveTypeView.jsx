import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeaveTypeForm from "../../../components/Leave/LeaveTypeForm";
import { getLeaveTypeById } from "../../../api/leave/leaveType";
import { useAuth } from "../../../auth/AuthContext";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

const LeaveTypeView = () => {

    const { id } = useParams();
  
  const {auth} = useAuth();

  const companyId = auth?.companyId;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getLeaveTypeById(companyId, id);
    setData(res);
  };

return(
<CompanyAdminLayout>

{
  data && (
    <LeaveTypeForm initialData={data} readOnly />
  )

}



 </CompanyAdminLayout>

)};

export default LeaveTypeView;
