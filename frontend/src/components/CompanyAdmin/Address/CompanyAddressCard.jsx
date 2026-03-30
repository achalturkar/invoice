import React from "react";

const CompanyAddressCard = ({ address, onEdit }) => {
  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold text-gray-800">
            {address.city}, {address.stateName}, {address.countryName}
            {address.isPrimary && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 rounded-full">
                Primary
              </span>
            )}
          </h4>

          <p className="text-sm text-gray-600 mt-1">
            {address.addressLine1}, {address.addressLine2}
          </p>

          <p className="text-sm text-gray-500">
            {address.countryName} - {address.pincode}
          </p>
        </div>

        <button
          onClick={onEdit}
          className="text-indigo-600 text-sm font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CompanyAddressCard;
