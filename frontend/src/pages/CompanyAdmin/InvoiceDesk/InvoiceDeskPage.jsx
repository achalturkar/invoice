import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceDeskPdf, invoiceDesk, updateInvoiceDesk } from "../../../api/invoiceDesk";
import CompanyAdminDashboard from "../../dashboard/companyadminDashboard/CompanyadminDashboard";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";


export default function InvoiceDeskPage() {
  const { companyId, invoiceId } = useParams();

  const [initialData, setInitialData] = useState(null);
  const isEdit = Boolean(invoiceId);

  useEffect(() => {
    if (isEdit) {
      getInvoiceDeskPdf(companyId, invoiceId)
        .then(res => setInitialData(res))
        .catch(err => console.error(err));
    }
  }, [companyId, invoiceId, isEdit]);

  const handleSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateInvoiceDesk(companyId, invoiceId, data);
        alert("Invoice Updated Successfully");
      } else {
        await invoiceDesk(companyId, data);
        alert("Invoice Created Successfully");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <CompanyAdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* <InvoiceDeskForm
          initialData={initialData}
          onSubmit={handleSubmit}
        /> */}
      </div>
    </CompanyAdminLayout>
  );
}
