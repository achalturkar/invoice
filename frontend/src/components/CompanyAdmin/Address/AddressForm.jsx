import React, { useEffect, useState } from "react";
import { ADDRESS_TYPES } from "../../constants/addressTypes";
import Dropdown from "../common/Dropdown";
import { useLocations } from "../../hooks/useLocations";

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState(
    initialData || { isPrimary: false }
  );

  const {
    countries,
    states,
    loadStatesByCountry,
  } = useLocations();

  useEffect(() => {
    if (form.countryId) {
      loadStatesByCountry(form.countryId);
    }
  }, [form.countryId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">
        {initialData ? "Edit Address" : "Add Address"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="addressLine1"
          placeholder="Address Line 1"
          className="input"
          onChange={handleChange}
          value={form.addressLine1 || ""}
        />

        <input
          name="addressLine2"
          placeholder="Address Line 2"
          className="input"
          onChange={handleChange}
          value={form.addressLine2 || ""}
        />

        <input name="city" placeholder="City" className="input" onChange={handleChange} />
        <input name="district" placeholder="District" className="input" onChange={handleChange} />

        <Dropdown
          label="Country"
          value={form.countryId}
          options={countries}
          onChange={(val) =>
            setForm({ ...form, countryId: val, stateId: null })
          }
        />

        <Dropdown
          label="State"
          value={form.stateId}
          options={states}
          onChange={(val) =>
            setForm({ ...form, stateId: val })
          }
        />

        <input name="pincode" placeholder="Pincode" className="input" onChange={handleChange} />

        <Dropdown
          label="Address Type"
          value={form.addressType}
          options={ADDRESS_TYPES}
          onChange={(val) =>
            setForm({ ...form, addressType: val })
          }
        />
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          name="isPrimary"
          checked={form.isPrimary}
          onChange={handleChange}
        />
        Set as Primary Address
      </label>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button onClick={() => onSubmit(form)} className="btn-primary">
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
