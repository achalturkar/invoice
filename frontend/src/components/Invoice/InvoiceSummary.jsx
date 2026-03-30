import React from "react";

export default function InvoiceSummary({ data }) {

  return (
    <div className="mt-8 border-t pt-6">

      <h3 className="font-semibold mb-4">Summary</h3>

      <div className="flex justify-end">
        <div className="w-80 space-y-2 text-right">
          <div>Subtotal: ₹ {data.subtotal}</div>
          <div>Total Tax: ₹ {data.totalTax}</div>
          <div className="font-bold text-lg">
            Grand Total: ₹ {data.grandTotal}
          </div>
          <div className="text-sm text-gray-500">
            Supply Type: {data.supplyType}
          </div>
        </div>
      </div>

    </div>
  );
}
