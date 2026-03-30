import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getClients } from "../../../api/clientApi";
import { useAuth } from "../../../auth/AuthContext";
import { getActiveBankAccounts } from "../../../api/bankAccountApi";

const TABS = [
  "Invoice Details",
  "Party Details",
  "Line Items",
  "Tax Summary",
  "Notes"
];

export default function InvoiceDesk() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [clients, setClients] = useState([]);
  const [banks, setBanks] = useState([]);
  const [resources, setResources] = useState([
    { resourceName: "", quantity: 1, unitPrice: 0, lineAmount: 0 }
  ]);

  const [formData, setFormData] = useState({
    invoiceNumber: "AUTO-GENERATED",
    invoiceNature: "",
    supplyType: "",
    status: "DRAFT",
    poNumber: "",
    invoiceDate: "",
    dueDate: "",
    paymentTerm: "",
    currency: "",
    client: "",
    bankAccount: "",
    notes: "",
    phone:""
  });

  const { auth } = useAuth();
  const companyId = auth?.companyId;



  useEffect(() => {
    if (!companyId) return;

    const fetchClients = async () => {
      try {
        const response = await getClients(companyId);

        console.log("API Response:", response);

        setClients(response);  // update state
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [companyId]);


  useEffect(() => {
    if (!companyId) return;

    const fetchBank = async () => {
      try {
        const response = await getActiveBankAccounts(companyId);

        console.log("API Response:", response);

        setBanks(response);
      } catch (error) {
        console.error("Error fetching Banks:", error);
      }
    };

    fetchBank();
  }, [companyId]);


  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResourceChange = (index, field, value) => {
    const updated = [...resources];
    updated[index][field] = value;

    if (field === "quantity" || field === "unitPrice") {
      updated[index].lineAmount =
        updated[index].quantity * updated[index].unitPrice;
    }

    setResources(updated);
  };

  const addResource = () => {
    setResources([
      ...resources,
      { resourceName: "", quantity: 1, unitPrice: 0, lineAmount: 0 }
    ]);
  };

  const subtotal = resources.reduce(
    (sum, r) => sum + Number(r.lineAmount),
    0
  );

  const totalTax = subtotal * 0.18; // Dummy 18%
  const grandTotal = subtotal + totalTax;

  /* ---------------- UI ---------------- */

  return (
    <CompanyAdminLayout>    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-6">Invoice Management</h1>

        {/* TABS */}
        <div className="flex border-b mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 whitespace-nowrap ${activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                  : "text-gray-500"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}

        {/* 1️⃣ Invoice Details */}
        {activeTab === "Invoice Details" && (
          <div className="grid grid-cols-2 gap-6">
            <Input label="Invoice Number" value={formData.invoiceNumber} disabled />
            <Select label="Invoice Nature" name="invoiceNature" onChange={handleChange}
              options={["STANDARD", "CREDIT", "DEBIT"]} />
            <Select label="Supply Type" name="supplyType" onChange={handleChange}
              options={["INTRA", "INTER", "INTERNATIONAL"]} />
            <Select label="Status" name="status" onChange={handleChange}
              options={["DRAFT", "FINAL", "CANCELLED"]} />
            <Input label="PO Number" name="poNumber" onChange={handleChange} />
            <Input label="Invoice Date" type="date" name="invoiceDate" onChange={handleChange} />
            <Input label="Due Date" type="date" name="dueDate" onChange={handleChange} />
            <Select label="Payment Term" name="paymentTerm" onChange={handleChange}
              options={["IMMEDIATE", "NET_15", "NET_30"]} />
            <Select label="Currency" name="currency" onChange={handleChange} options={["INR", "Dollar", "pounds"]} />
          </div>
        )}

        {/* 2️⃣ Party Details */}
        {activeTab === "Party Details" && (
          <div className="grid grid-cols-2 gap-6">
            <Select
              label="Client"
              name="client"
              onChange={handleChange}
              options={clients.map((c) => c.clientName)}
            />
            <Select
              label="Client"
              name="client"
              onChange={handleChange}
              options={clients.map((c) => c.phone)}
            />
            <Select 
            label="Bank Account" 
            name="bankAccount" 
            onChange={handleChange} 
            options={banks.map((b)=>b.bankName)}
            />
          </div>
        )}

        {/* 3️⃣ Line Items */}
        {activeTab === "Line Items" && (
          <div>
            <table className="w-full border rounded-lg overflow-hidden">
              <thead className="bg-gray-50 text-sm">
                <tr>
                  <th className="p-3 text-left">Resource</th>
                  <th className="p-3 text-left">Qty</th>
                  <th className="p-3 text-left">Unit Price</th>
                  <th className="p-3 text-left">Line Amount</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((res, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">
                      <input
                        className="input"
                        value={res.resourceName}
                        onChange={(e) =>
                          handleResourceChange(index, "resourceName", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="input"
                        value={res.quantity}
                        onChange={(e) =>
                          handleResourceChange(index, "quantity", Number(e.target.value))
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="input"
                        value={res.unitPrice}
                        onChange={(e) =>
                          handleResourceChange(index, "unitPrice", Number(e.target.value))
                        }
                      />
                    </td>
                    <td className="p-2 font-medium">
                      ₹ {res.lineAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={addResource}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Resource
            </button>
          </div>
        )}

        {/* 4️⃣ Tax Summary */}
        {activeTab === "Tax Summary" && (
          <div className="max-w-md ml-auto bg-gray-50 p-6 rounded-xl">
            <SummaryRow label="Subtotal" value={subtotal} />
            <SummaryRow label="GST 18%" value={totalTax} />
            <hr className="my-3" />
            <SummaryRow label="Grand Total" value={grandTotal} bold />
          </div>
        )}

        {/* 5️⃣ Notes */}
        {activeTab === "Notes" && (
          <textarea
            name="notes"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="5"
            placeholder="Enter notes..."
          />
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2 border rounded-lg">Cancel</button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg">
            Save Draft
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Finalize
          </button>
        </div>
      </div>
    </div>
    </CompanyAdminLayout>

  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Input({ label, disabled, ...props }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function Select({ label, options = [], ...props }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <select
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold text-lg" : ""}`}>
      <span>{label}</span>
      <span>₹ {value.toFixed(2)}</span>
    </div>
  );
}
