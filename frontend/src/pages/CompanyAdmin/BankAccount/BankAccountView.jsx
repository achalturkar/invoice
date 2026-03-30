import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getBankAccountById } from "../../../api/bankAccountApi";
import { useAuth } from "../../../auth/AuthContext";

const BankAccountView = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const companyId = auth?.companyId;
  const navigate = useNavigate();

  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBankAccountById(companyId, id);
        setBank(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [companyId, id]);

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="p-6 text-center">Loading...</div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">View Bank Account</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Bank Name" value={bank?.bankName} />
          <Field label="Branch" value={bank?.bankBranch} />
          <Field label="Account Holder" value={bank?.bankAccountName} />
          <Field label="Account Number" value={bank?.bankAccountNo} />
          <Field label="IFSC Code" value={bank?.bankIfsc} />
          <Field label="SWIFT Code" value={bank?.swiftCode} />
          <Field label="PAN No" value={bank?.panNo} />
          <Field label="TAN No" value={bank?.tanNo} />
          <Field label="Udyam Reg No" value={bank?.udyamRegNo} />
          <Field label="Status" value={bank?.status} />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </div>
    </CompanyAdminLayout>
  );
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

export default BankAccountView;
