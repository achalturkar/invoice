import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { addClientAddress } from "../../../api/clientAddressApi";
import { useAuth } from "../../../auth/AuthContext";
import { useLocationData } from "../../../hooks/useLocationData";

const emptyAddress = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  pincode: "",
  stateId: "",
  countryId: "",
  addressType: "",
  isPrimary: true,
};

const AddClientAddress = () => {
  const { auth } = useAuth();
  const { clientId } = useParams();
  const navigate = useNavigate();

  const {
    countries,
    states,
    loadStates,
  } = useLocationData();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [billing, setBilling] = useState({
    ...emptyAddress,
    addressType: "BILLING",
  });

  const [shipping, setShipping] = useState({
    ...emptyAddress,
    addressType: "SHIPPING",
  });

  const handleSave = async () => {
    setError("");

    if (!billing.addressLine1 || !billing.city || !billing.countryId || !billing.stateId) {
      setError("Billing address, country and state are required");
      return;
    }

    try {
      setLoading(true);

      await addClientAddress(auth.companyId, clientId, billing);

      if (shipping.addressLine1) {
        await addClientAddress(auth.companyId, clientId, shipping);
      }

      navigate(`/clients/view/${clientId}`);
    } catch (err) {
      setError("Failed to save addresses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyAdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-6">

        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Add Client Address
        </h2> 
        <p className="text-sm text-gray-500 mb-6">
          Billing & Shipping address for invoices and delivery
        </p>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-sm px-4 py-2 rounded">
            {error}
          </div>
        )}

        <AddressCard
          title="Billing Address"
          data={billing}
          setData={setBilling}
          countries={countries}
          states={states}
          loadStates={loadStates}
        />

        <AddressCard
          title="Shipping Address"
          data={shipping}
          setData={setShipping}
          countries={countries}
          states={states}
          loadStates={loadStates}
          optional
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(`/clients/view/${clientId}`)}
            className="btn-secondary"
          >
            Skip
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>
    </CompanyAdminLayout>
  );
};

export default AddClientAddress;
const AddressCard = ({
  title,
  data,
  setData,
  countries,
  states,
  loadStates,
  optional,
}) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="border rounded-xl p-5 mb-6">
      <h3 className="font-semibold text-gray-800 mb-4">
        {title} {optional && <span className="text-xs text-gray-400">(Optional)</span>}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="addressLine1"
          placeholder="Address Line 1"
          value={data.addressLine1}
          onChange={handleChange}
          className="input"
        />

        <input
          name="addressLine2"
          placeholder="Address Line 2"
          value={data.addressLine2}
          onChange={handleChange}
          className="input"
        />

        {/* COUNTRY */}
        <select
          name="countryId"
          value={data.countryId}
          onChange={(e) => {
            handleChange(e);
            loadStates(e.target.value);
          }}
          className="input max-h-52 overflow-y-auto"
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* STATE */}
        <select
          name="stateId"
          value={data.stateId}
          onChange={handleChange}
          className="input max-h-52 overflow-y-auto"
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          name="city"
          placeholder="City"
          value={data.city}
          onChange={handleChange}
          className="input"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={data.pincode}
          onChange={handleChange}
          className="input"
        />
      </div>

      <p className="mt-3 text-xs text-green-600">
        ✔ Primary {data.addressType.toLowerCase()} address
      </p>
    </div>
  );
};
