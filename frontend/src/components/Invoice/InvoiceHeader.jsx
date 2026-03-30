import React from "react";

export default function InvoiceHeader({ invoiceData, setInvoiceData }) {

  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grid grid-cols-3 gap-6 border-b pb-6 mb-6">

      <div>
        <label className="block text-sm font-medium">Client</label>
        <select
          name="clientId"
          value={invoiceData.clientId}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2"
        >
          <option value="">Select Client</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Bank Account</label>
        <select
          name="bankAccountId"
          value={invoiceData.bankAccountId}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2"
        >
          <option value="">Select Bank</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Currency</label>
        <select
          name="currencyId"
          value={invoiceData.currencyId}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2"
        >
          <option value="">Select Currency</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Invoice Date</label>
        <input 
          type="date"
          name="invoiceDate"
          value={invoiceData.invoiceDate}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input 
          type="date"
          name="dueDate"
          value={invoiceData.dueDate}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Invoice Nature</label>
        <select
          name="invoiceNature"
          value={invoiceData.invoiceNature}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg p-2"
        >
          <option value="STANDARD">STANDARD</option>
          <option value="CREDIT">CREDIT</option>
          <option value="DEBIT">DEBIT</option>
        </select>
      </div>

    </div>
  );
}
