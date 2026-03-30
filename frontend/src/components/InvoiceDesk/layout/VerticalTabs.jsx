import React, { useState } from "react";

const tabs = [
  { id: "invoiceInfo", label: "Invoice Info" },
  { id: "companyDetails", label: "Company Details" },
  { id: "clientDetails", label: "Client Details" },
  { id: "invoiceLines", label: "Invoice Lines" },
  { id: "taxSummary", label: "Tax Summary" },
];

export default function VerticalTabs({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 border-r border-gray-200 bg-white">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() =>
            setActiveTab(activeTab === tab.id ? null : tab.id)
          }
          className={`px-5 py-3 cursor-pointer transition-all duration-200
            ${
              activeTab === tab.id
                ? "border-l-4 border-blue-600 bg-gray-50 text-gray-900 font-semibold"
                : "border-l-4 border-transparent text-gray-500 hover:bg-gray-100"
            }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
