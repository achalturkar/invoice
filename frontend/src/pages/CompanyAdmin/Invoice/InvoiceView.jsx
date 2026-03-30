import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getInvoiceById } from "../../../api/invoiceApi";

export default function InvoiceView() {
  const { invoiceId } = useParams();
  const companyId = localStorage.getItem("companyId");
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    getInvoiceById(companyId, invoiceId).then(setInvoice);
  }, []);

  if (!invoice) return <div>Loading...</div>;

  return (
    <CompanyAdminLayout>
      <div className="bg-white p-8 max-w-4xl mx-auto shadow">

        <h2 className="text-xl font-bold mb-4">
          Invoice #{invoice.invoiceNumber}
        </h2>

        <p><b>Client:</b> {invoice.clientName}</p>
        <p><b>Date:</b> {invoice.invoiceDate}</p>

        <table className="w-full mt-6 border">
          <thead>
            <tr className="bg-gray-100">
              <th>Candidate</th>
              <th>Hours</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((i, idx) => (
              <tr key={idx}>
                <td>{i.candidateName}</td>
                <td>{i.workingHours}</td>
                <td>{i.ratePerHour}</td>
                <td>{i.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-6">
          <p>Subtotal: ₹ {invoice.subTotal}</p>
          <p>Total: ₹ {invoice.totalAmount}</p>
        </div>

      </div>
    </CompanyAdminLayout>
  );
}
