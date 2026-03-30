import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { createInvoice } from "../../../api/invoiceApi";
import { getCandidates } from "../../../api/employeeApi";
import { getClients } from "../../../api/clientApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

export default function CreateInvoice() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const [clients, setClients] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    clientId: "",
    invoiceDate: "",
    dueDate: "",
    poNumber: "",
    gstApplicable: true,
    gstPercent: 18,
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!companyId) return;

    getClients(companyId).then(setClients);
    getCandidates(companyId).then(setCandidates);
  }, [companyId]);

  /* ================= ITEMS ================= */
  const addItem = () => {
    setItems([
      ...items,
      {
        employeeId: "",
        workingHours: "",
        ratePerHour: "",
        hsn: "",
        periodFrom: "",
        periodTo: "",
      },
    ]);
  };

  const updateItem = (index, key, value) => {
    const copy = [...items];
    copy[index][key] = value;
    setItems(copy);
  };

  const removeItem = index =>
    setItems(items.filter((_, i) => i !== index));

  /* ================= TOTALS ================= */
  const subTotal = items.reduce(
    (sum, i) => sum + i.workingHours * i.ratePerHour,
    0
  );

  const gstAmount = form.gstApplicable
    ? (subTotal * form.gstPercent) / 100
    : 0;

  const totalAmount = subTotal + gstAmount;

  /* ================= SUBMIT ================= */
  const submit = async () => {
    if (!form.clientId || items.length === 0) {
      alert("Please complete invoice details");
      return;
    }

    await createInvoice(companyId, { ...form, items });
    alert("Invoice created successfully");
    navigate("/invoices");
  };

  /* ================= UI ================= */
  return (
    <CompanyAdminLayout>
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow">

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-6">
          Create Payroll Invoice
        </h2>

        {/* CLIENT & INVOICE INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div>
            <label className="block text-sm font-medium mb-1">
              Client
            </label>
            <select
              className="border rounded p-2 w-full"
              value={form.clientId}
              onChange={e =>
                setForm({ ...form, clientId: e.target.value })
              }
            >
              <option value="">Select Client</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.clientName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              className="border rounded p-2 w-full"
              value={form.invoiceDate}
              onChange={e =>
                setForm({ ...form, invoiceDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="border rounded p-2 w-full"
              value={form.dueDate}
              onChange={e =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />
          </div>
        </div>


        <h3 className="font-bold mb-2">Service Details</h3>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
              PO Number
            </label>
            <input
              type="text"
              className="border rounded p-1 w-1/5"
              value={form.poNumber}
              onChange={e =>
                setForm({ ...form, poNumber: e.target.value })
              }
            />

      


        </div>

        {/* PAYROLL ITEMS */}
        <h3 className="text-lg font-semibold mb-3">
          Payroll Details
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Candidate</th>
                <th className="border p-2">Period From</th>
                <th className="border p-2">Period To</th>
                <th className="border p-2 text-right">Hours</th>
                <th className="border p-2 text-right">Rate / Hr</th>
                <th className="border p-2 text-right">Amount</th>
                <th className="border p-2"></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">
                    <select
                      className="border rounded p-1 w-full"
                      value={item.employeeId}
                      onChange={e =>
                        updateItem(i, "employeeId", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {candidates.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.fullName}
                        </option>
                      ))}
                    </select>
                  </td>

                  
                  <td className="border p-2">
                    <input
                      type="date"
                      className="border rounded p-1 w-full"
                      value={item.periodFrom}
                      onChange={e =>
                        updateItem(i, "periodFrom", e.target.value)
                      }
                    />
                  </td>

                  <td className="border p-2">
                    <input
                      type="date"
                      className="border rounded p-1 w-full"
                      value={item.periodTo}
                      onChange={e =>
                        updateItem(i, "periodTo", e.target.value)
                      }
                    />
                  </td>

                  <td className="border p-2 text-right">
                    <input
                      type="number"
                      className="border rounded p-1 w-20 text-right"
                      value={item.workingHours}
                      onChange={e =>
                        updateItem(i, "workingHours", +e.target.value)
                      }
                    />
                  </td>

                  <td className="border p-2 text-right">
                    <input
                      type="number"
                      className="border rounded p-1 w-24 text-right"
                      value={item.ratePerHour}
                      onChange={e =>
                        updateItem(i, "ratePerHour", +e.target.value)
                      }
                    />
                  </td>

                  <td className="border p-2 text-right">
                    ₹ {(item.workingHours * item.ratePerHour || 0).toFixed(2)}
                  </td>

                  <td className="border p-2 text-center">
                    <button
                      onClick={() => removeItem(i)}
                      className="text-red-600 font-bold"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addItem}
          className="mb-6 px-4 py-2 bg-gray-200 rounded"
        >
          + Add Candidate
        </button>

        {/* TAX */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={form.gstApplicable}
            onChange={e =>
              setForm({ ...form, gstApplicable: e.target.checked })
            }
          />
          <span className="text-sm">
            Apply GST ({form.gstPercent}%)
          </span>
        </div>

        {/* SUMMARY */}
        <div className="max-w-sm ml-auto text-sm space-y-1 mb-6">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST</span>
            <span>₹ {gstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>₹ {totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="text-right">
          <button
            onClick={submit}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Generate Invoice
          </button>
        </div>

      </div>
    </CompanyAdminLayout>
  );
}
