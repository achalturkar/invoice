import React from "react";

export default function InvoiceLines({ invoiceData, setInvoiceData }) {

  const addLine = () => {
    setInvoiceData({
      ...invoiceData,
      lines: [
        ...invoiceData.lines,
        {
          employeeId: "",
          resourceName: "",
          quantity: 1,
          unitPrice: 0
        }
      ]
    });
  };

  const updateLine = (index, field, value) => {
    const updatedLines = [...invoiceData.lines];
    updatedLines[index][field] = value;
    setInvoiceData({ ...invoiceData, lines: updatedLines });
  };

  return (
    <div className="mt-6">

      <h2 className="text-lg font-semibold mb-4">Line Items</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Resource</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Unit Price</th>
            <th className="p-2 border">Amount</th>
          </tr>
        </thead>

        <tbody>
          {invoiceData.lines.map((line, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  value={line.resourceName}
                  onChange={(e) =>
                    updateLine(index, "resourceName", e.target.value)
                  }
                  className="w-full border rounded p-1"
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  value={line.quantity}
                  onChange={(e) =>
                    updateLine(index, "quantity", e.target.value)
                  }
                  className="w-full border rounded p-1"
                />
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  value={line.unitPrice}
                  onChange={(e) =>
                    updateLine(index, "unitPrice", e.target.value)
                  }
                  className="w-full border rounded p-1"
                />
              </td>

              <td className="border p-2 text-right">
                {(line.quantity * line.unitPrice).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addLine}
        className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        + Add Line
      </button>

    </div>
  );
}
