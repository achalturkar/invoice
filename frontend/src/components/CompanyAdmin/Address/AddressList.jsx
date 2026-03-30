import React from "react";
// AddressList.jsx
import AddressCard from "./AddressCard";
import EmptyState from "../common/EmptyState";

const AddressList = ({ addresses, onEdit, onDelete }) => {
  if (!addresses.length) {
    return <EmptyState title="No addresses added yet" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {addresses.map((addr) => (
        <AddressCard
          key={addr.id}
          address={addr}
          onEdit={() => onEdit(addr)}
          onDelete={() => onDelete(addr.id)}
        />
      ))}
    </div>
  );
};

export default AddressList;
