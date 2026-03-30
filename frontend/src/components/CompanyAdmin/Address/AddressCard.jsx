import React from "react";
import AddressTypeBadge from "./AddressTypeBadge";

const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <AddressTypeBadge type={address.addressType} />
          {address.isPrimary && (
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Primary
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={onEdit} className="text-blue-600 text-sm">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-500 text-sm">
            Delete
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700 space-y-1">
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.stateName} ({address.stateCode})
        </p>
        <p>
          {address.countryName} - {address.pincode}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
