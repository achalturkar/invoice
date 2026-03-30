import React, { useState } from "react";
import { useLocationData } from "../../../hooks/useLocationData";
import LocationDropdown from "../Location/LocationDropdown";

const CompanyAddressForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    isPrimary: false,
  });

  const location = useLocationData();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        className="input"
        placeholder="Address Line 1"
        onChange={(e) =>
          setForm({ ...form, addressLine1: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Address Line 2"
        onChange={(e) =>
          setForm({ ...form, addressLine2: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="City"
        onChange={(e) =>
          setForm({ ...form, city: e.target.value })
        }
      />

      <input
        className="input"
        placeholder="Pincode"
        onChange={(e) =>
          setForm({ ...form, pincode: e.target.value })
        }
      />

      <LocationDropdown
        form={form}
        setForm={setForm}
        location={location}
      />

      <label className="col-span-full flex gap-2">
        <input
          type="checkbox"
          checked={form.isPrimary}
          onChange={(e) =>
            setForm({ ...form, isPrimary: e.target.checked })
          }
        />
        Set as Primary Address
      </label>

      <button className="col-span-full bg-indigo-600 text-white py-2 rounded-lg">
        Save Address
      </button>
    </form>
  );
};

export default CompanyAddressForm;
