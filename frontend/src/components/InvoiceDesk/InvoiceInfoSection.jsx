import React from "react";

export default function InvoiceInfoSection() {
  return (
    <div className="bg-white shadow-sm rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Invoice Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <input className="input" placeholder="Invoice Nature" />
        <input className="input" placeholder="Supply Type" />
        <input type="date" className="input" />
        <input type="date" className="input" />
        <input className="input" placeholder="Payment Term" />
        <input className="input" placeholder="PO Number" />
        <input className="input" placeholder="Currency" />
      </div>

      <textarea
        className="input w-full"
        placeholder="Description"
      />
    </div>
  );
}
