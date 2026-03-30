import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Globe,
  FileText,
  MapPin,
  Building2,
  Pencil,
  Plus,
  ArrowLeft,
} from "lucide-react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getClientById } from "../../../api/clientApi";
import { useAuth } from "../../../auth/AuthContext";

const ClientView = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!companyId || !clientId) return;
    loadClient();
  }, [companyId, clientId]);

  const loadClient = async () => {
    try {
      setLoading(true);
      const data = await getClientById(companyId, clientId);
      setClient(data);
    } catch (err) {
      setError("Unable to load client details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CompanyAdminLayout>
        <div className="p-10 text-center text-gray-500">
          Loading client details...
        </div>
      </CompanyAdminLayout>
    );
  }

  if (error) {
    return (
      <CompanyAdminLayout>
        <div className="p-10 text-center text-red-600">
          {error}
        </div>
      </CompanyAdminLayout>
    );
  }

  if (!client) return null;

  const billingAddress = client.clientAddresses?.find(
    (a) => a.addressType === "BILLING"
  );

  const shippingAddress = client.clientAddresses?.find(
    (a) => a.addressType === "SHIPPING"
  );

  return (
    <CompanyAdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
       
        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {client.clientName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Client ID: {client.id}
            </p>

            <span className="inline-block mt-3 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
              Active Client
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                navigate(`/clients/edit/${client.id}`)
              }
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
            >
              <Pencil size={16} /> Edit
            </button>

            <button
              onClick={() =>
                navigate(`/clients/${client.id}/add-address`)
              }
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              <Plus size={16} /> Add Address
            </button>
          </div>
        </div>

        {/* ================= CLIENT INFO ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard icon={<Mail />} label="Email" value={client.email} />
          <InfoCard icon={<Phone />} label="Phone" value={client.phone} />
          <InfoCard
            icon={<Globe />}
            label="Website"
            value={formatWebsiteUrl(client.webUrl)}
            isLink
          />          <InfoCard
            icon={<FileText />}
            label="GST / PAN"
            value={`${client.gstNo} | ${client.panNo}`}
          />
        </div>

        {/* ================= ADDRESSES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddressCard title="Billing Address" address={billingAddress} />
          <AddressCard title="Shipping Address" address={shippingAddress} />
        </div>
      </div>
    </CompanyAdminLayout>
  );
};

/* ================= SUB COMPONENTS ================= */

const InfoCard = ({ icon, label, value, isLink = false }) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border bg-white shadow-sm">
      <div className="text-indigo-600">{icon}</div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>

        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:underline break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-gray-900 break-all">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};


const AddressCard = ({ title, address }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-gray-800 flex items-center gap-2">
        <Building2 size={18} />
        {title}
      </h2>

      {address?.isPrimary && (
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          Primary
        </span>
      )}
    </div>

    {address ? (
      <div className="text-sm text-gray-700 space-y-1">
        <p className="font-medium">{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.district} - {address.pincode}
        </p>
        <p>
          {address.stateName} ({address.stateCode}) - {address.countryName}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
          <MapPin size={12} /> {address.countryName}
        </p>
      </div>
    ) : (
      <p className="text-sm text-gray-400 italic">
        No address added
      </p>
    )}
  </div>
);

export default ClientView;


const formatWebsiteUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};


