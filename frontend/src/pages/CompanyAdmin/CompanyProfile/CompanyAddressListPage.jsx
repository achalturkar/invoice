import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyAddressCard from "../../../components/CompanyAdmin/Address/CompanyAddressCard";
import { useAuth } from "../../../auth/AuthContext";
import { getCompanyAddresses } from "../../../api/companyaddressApi";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";

const CompanyAddressListPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getCompanyAddresses(auth.companyId)
      .then(setAddresses)
      .catch(console.error);
  }, [auth.companyId]);

  return (
    <CompanyAdminLayout>   
         <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Company Addresses</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("new")}
        >
          Add Address
        </button>
      </div>

      {addresses.map(addr => (
        <CompanyAddressCard
          key={addr.id}
          address={addr}
          onEdit={() => navigate(`edit/${addr.id}`)}
        />
      ))}
    </div>
    </CompanyAdminLayout>

  );
};

export default CompanyAddressListPage;
