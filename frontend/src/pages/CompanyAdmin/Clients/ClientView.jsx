import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getLoggedInUser } from "../../../api/authApi";
import { getClientById } from "../../../api/clientApi";

const ClientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getLoggedInUser();
        const data = await getClientById(user.company, id);
        setClient(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load client");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="flex justify-center items-center h-40 text-gray-500">
          Loading client...
        </div>
      </CompanyAdminLayout>
    );
  }

  return (
    <CompanyAdminLayout>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {client.clientName}
            </h2>
            <p className="text-sm text-gray-500">
              Client Details
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/clients/edit/${client.id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => navigate("/clients")}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Info label="Client Name" value={client.clientName} />
          <Info label="Email" value={client.email} />
          <Info label="Phone" value={client.phone} />
        </Section>

        {/* TAX */}
        <Section title="Tax Information">
          <Info label="GST Number" value={client.gstNo} />
          <Info label="PAN Number" value={client.panNo} />
          <Info label="State Code" value={client.stateCode} />
          <Info label="State Name" value={client.stateName} />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <Info label="Billing Address" value={client.billingAddress} full />
          <Info label="Shipping Address" value={client.shippingAddress} full />
        </Section>

      </div>
    </CompanyAdminLayout>
  );
};

export default ClientView;

/* UI */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold mb-4 text-gray-700">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Info = ({ label, value, full }) => (
  <div className={`bg-gray-50 border rounded-lg p-4 ${full ? "md:col-span-2" : ""}`}>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-800 mt-1">
      {value || "-"}
    </p>
  </div>
);
