import React from "react";
// AddressTypeBadge.jsx
const colorMap = {
  BILLING: "bg-blue-100 text-blue-700",
  SHIPPING: "bg-purple-100 text-purple-700",
};

const AddressTypeBadge = ({ type }) => (
  <span
    className={`text-xs px-2 py-1 rounded ${colorMap[type]}`}
  >
    {type}
  </span>
);

export default AddressTypeBadge;
