import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getClients } from "../../../api/clientApi";
import { getActiveBankAccounts } from "../../../api/bankAccountApi";
import { useAuth } from "../../../auth/AuthContext";
import { getCurrency } from "../../../api/currencyApi";
import { invoiceDesk } from "../../../api/invoiceDesk";

export default function InvoiceDesk() {

    const { auth } = useAuth();
    const companyId = auth?.companyId;

    const [clients, setClients] = useState([]);
    const [banks, setBanks] = useState([]);
    const [currency, setCurrency] = useState([]);

    const [resources, setResources] = useState([
        { resourceName: "", quantity: 1, unitPrice: 0 }
    ]);

    const [formData, setFormData] = useState({
        clientId: "",
        bankAccountId: "",
        currencyId: "",
        invoiceDate: "",
        dueDate: "",
        invoiceNature: "STANDARD",
        paymentTerm: "NET_15",
        poNumber: "",
        description: ""
    });

    /* ---------------- FETCH DATA ---------------- */

    useEffect(() => {
        if (!companyId) return;

        getClients(companyId).then(setClients);
        getActiveBankAccounts(companyId).then(setBanks);
        getCurrency().then(setCurrency);
    }, [companyId]);

    /* ---------------- HANDLERS ---------------- */

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleResourceChange = (index, field, value) => {
        const updated = [...resources];
        updated[index][field] = value;
        setResources(updated);
    };

    const addResource = () => {
        setResources([...resources, { resourceName: "", quantity: 1, unitPrice: 0 }]);
    };

    /* ---------------- CALCULATIONS ---------------- */

    const subtotal = resources.reduce(
        (sum, r) => sum + (r.quantity * r.unitPrice),
        0
    );

    const gst = subtotal * 0.18;
    const total = subtotal + gst;



    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async () => {

        const payload = {
            clientId: formData.clientId,
            bankAccountId: formData.bankAccountId,
            currencyId: formData.currencyId,
            invoiceDate: formData.invoiceDate,
            dueDate: formData.dueDate,
            invoiceNature: formData.invoiceNature,
            paymentTerm: formData.paymentTerm,
            poNumber: formData.poNumber,
            description: formData.description,
            reverseCharge: false,

            lines: resources.map(r => ({
                resourceName: r.resourceName,
                quantity: r.quantity,
                unitPrice: r.unitPrice,
                sac: 998512,
                periodFrom: formData.invoiceDate,
                periodTo: formData.dueDate
            }))
        };

        console.log("Payload", payload);

        try {

            const res = await invoiceDesk(companyId, payload);

            console.log("Invoice Created", res);


            alert("Invoice Created Successfully");

        } catch (error) {

            console.error(error);
            alert("Invoice creation failed");

        }

    };

    /* ---------------- UI ---------------- */

    return (
        <CompanyAdminLayout>

            <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow">

                <h1 className="text-2xl font-semibold mb-6">Create Invoice</h1>

                <div className="grid grid-cols-2 gap-6">

                    <Select
                        label="Client"
                        name="clientId"
                        onChange={handleChange}
                        options={clients.map(c => ({
                            label: c.clientName,
                            value: c.id
                        }))}
                    />

                    <Select
                        label="Bank Account"
                        name="bankAccountId"
                        onChange={handleChange}
                        options={banks.map(b => ({
                            label: b.bankName,
                            value: b.id
                        }))}
                    />

                    <Input label="PO Number" name="poNumber" onChange={handleChange} />

                    <Input type="date" label="Invoice Date" name="invoiceDate" onChange={handleChange} />

                    <Input type="date" label="Due Date" name="dueDate" onChange={handleChange} />

                    <Select label="Currency"
                        name="currencyId"
                        onChange={handleChange}
                        options={currency.map(c => ({
                            label: c.code,
                            value: c.id
                        }))} />

                </div>

                {/* Line Items */}

                <div className="mt-8">

                    <h2 className="text-lg font-semibold mb-4">Line Items</h2>

                    <table className="w-full border">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2">Resource</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Unit Price</th>
                            </tr>
                        </thead>

                        <tbody>

                            {resources.map((r, i) => (
                                <tr key={i}>

                                    <td>
                                        <input
                                            className="border p-2 w-full"
                                            value={r.resourceName}
                                            onChange={(e) =>
                                                handleResourceChange(i, "resourceName", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            className="border p-2 w-full"
                                            value={r.quantity}
                                            onChange={(e) =>
                                                handleResourceChange(i, "quantity", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            className="border p-2 w-full"
                                            value={r.unitPrice}
                                            onChange={(e) =>
                                                handleResourceChange(i, "unitPrice", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                    <button
                        onClick={addResource}
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Resource
                    </button>

                </div>

                {/* Summary */}

                <div className="mt-8 text-right">

                    <p>Subtotal: ₹ {subtotal}</p>
                    <p>GST 18%: ₹ {gst}</p>
                    <p className="font-bold text-lg">Total: ₹ {total}</p>

                </div>

                {/* Description */}

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="w-full border p-3 mt-6"
                />

                <button
                    onClick={handleSubmit}
                    className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
                >
                    Create Invoice
                </button>

            </div>

        </CompanyAdminLayout>
    );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ label, ...props }) {

    return (
        <div>
            <label className="block text-sm mb-1">{label}</label>
            <input {...props} className="border w-full p-2 rounded" />
        </div>
    );

}

function Select({ label, options = [], ...props }) {

    return (
        <div>

            <label className="block text-sm mb-1">{label}</label>

            <select {...props} className="border w-full p-2 rounded">

                <option value="">Select</option>

                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                        {opt.label}
                    </option>
                ))}

            </select>

        </div>
    );

}
