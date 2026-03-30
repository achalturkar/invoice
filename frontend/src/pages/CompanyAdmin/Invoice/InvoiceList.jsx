import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { deleteInvoice, getInvoices, viewInvoice, downloadInvoice } from "../../../api/invoiceApi";
import { openPdfInNewTab, downloadPdfFile } from "../../../utils/openPdfInNewTab";
import { formatDate } from "../../../utils/dateUtils";
import { useAuth } from "../../../auth/AuthContext";



export default function InvoiceList() {
    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);
    const {auth} =useAuth();
    const companyId = auth?.companyId;

    /* ================= LOAD ================= */

    useEffect(() => {
        if (companyId) loadInvoices();
    }, [companyId]);

    const loadInvoices = async () => {
        const data = await getInvoices(companyId);
        setInvoices(data);
    };

    /* ================= DELETE ================= */

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this invoice?")) return;
        await deleteInvoice(companyId, id);
        setInvoices(prev => prev.filter(i => i.id !== id));
        setOpenMenuId(null);
    };

    /* ================= CLOSE MENU (MOUSEDOWN) ================= */

    useEffect(() => {
        const close = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    /* ================= UI ================= */

    return (
        <CompanyAdminLayout>
            <div className="bg-white p-6 rounded-xl shadow max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Invoices</h2>

                    <Link
                        to="/invoices/new"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        + Create Invoice
                    </Link>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="min-w-[700px] w-full text-sm border border-gray-200">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 border text-left w-12">#</th>
                                <th className="p-3 border text-left">Invoice No</th>
                                <th className="p-3 border text-left">Invoice Date</th>
                                <th className="p-3 border text-left">Client</th>
                                <th className="p-3 border text-right">Amount</th>
                                <th className="p-3 border text-center">Status</th>
                                <th className="p-3 border text-right w-16">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoices.map((inv, index) => (
                                <tr key={inv.id} className="hover:bg-gray-50">

                                    {/* SR NO */}
                                    <td className="p-3 border">{index + 1}</td>

                                    {/* INVOICE NO */}
                                    <td className="p-3 border font-medium">
                                        {inv.invoiceNumber}
                                    </td>

                                    {/* DATE */}
                                    <td className="p-3 border">
                                        {formatDate(inv.invoiceDate)}
                                    </td>

                                    {/* CLIENT */}
                                    <td className="p-3 border">
                                        {inv.clientName}
                                    </td>

                                    {/* AMOUNT */}
                                    <td className="p-3 border text-right font-semibold">
                                        ₹ {inv.totalAmount}
                                    </td>

                                    {/* STATUS */}
                                    <td className="p-3 border text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                   ${inv.status === "PAID"
                                                    ? "bg-green-100 text-green-700"
                                                    : inv.status === "SENT"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {inv.status}
                                        </span>
                                    </td>

                                    {/* ACTION */}
                                    <td className="p-3 border text-right relative">
                                        <button
                                            onClick={() =>
                                                setOpenMenuId(openMenuId === inv.id ? null : inv.id)
                                            }
                                            className="px-2 py-1 rounded hover:bg-gray-200"
                                        >
                                            ⋮
                                        </button>

                                        {openMenuId === inv.id && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-2 top-10 w-48 bg-white border rounded-lg shadow-xl z-[9999]"
                                            >
                                                <MenuItem
                                                    label="View Invoice"
                                                    onClick={async () => {
                                                        try {
                                                            const blob = await viewInvoice(companyId, inv.id);
                                                            openPdfInNewTab(blob);
                                                            setOpenMenuId(null);
                                                        } catch (e) {
                                                            alert(e.message);
                                                        }
                                                    }}
                                                />

                                                <MenuItem
                                                    label="Download PDF"
                                                    onClick={async () => {
                                                        try {
                                                            const blob = await downloadInvoice(companyId, inv.id);
                                                            downloadPdfFile(
                                                                blob,
                                                                `invoice-${inv.invoiceNumber}.pdf`
                                                            );
                                                            setOpenMenuId(null);
                                                        } catch (e) {
                                                            alert(e.message);
                                                        }
                                                    }}
                                                />

                                                <MenuItem
                                                    label="Copy Invoice No"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(inv.invoiceNumber);
                                                        setOpenMenuId(null);
                                                    }}
                                                />

                                                <MenuItem
                                                    label=" All Invoices"
                                                    onClick={() =>
                                                        navigate(
                                                            `/company/${companyId}/clients/${c.id}/invoices`
                                                        )
                                                    }
                                                />
                                                <MenuItem
                                                    label="Mark as Sent"
                                                    onClick={() => alert("Status API pending")}
                                                />

                                                <MenuItem
                                                    label="Delete"
                                                    danger
                                                    onClick={() => handleDelete(inv.id)}
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {invoices.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="p-6 text-center text-gray-400">
                                        No invoices found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </CompanyAdminLayout>
    );
}

/* ================= MENU ITEM ================= */

const MenuItem = ({ label, onClick, danger }) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-2 text-sm
      ${danger
                ? "text-red-600 hover:bg-red-50"
                : "text-gray-700 hover:bg-gray-100"}
    `}
    >
        {label}
    </button>
);


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
// import {
//   getInvoices,
//   deleteInvoice,
//   updateInvoiceStatus,
//   emailInvoice
// } from "../../../api/invoiceApi";

// export default function InvoiceList() {
//   const companyId = localStorage.getItem("companyId");
//   const [invoices, setInvoices] = useState([]);
//   const [openMenu, setOpenMenu] = useState(null);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     const data = await getInvoices(companyId);
//     setInvoices(data);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete invoice?")) return;
//     await deleteInvoice(companyId, id);
//     setInvoices(prev => prev.filter(i => i.id !== id));
//   };

//   return (
//     <CompanyAdminLayout>
//       <div className="bg-white p-6 rounded-xl shadow max-w-7xl mx-auto">

//         <div className="flex justify-between mb-6">
//           <h2 className="text-xl font-bold">Invoices</h2>
//           <Link to="/invoices/new" className="btn-primary">
//             + Create Invoice
//           </Link>
//         </div>

//         <table className="w-full text-sm border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th>Invoice</th>
//               <th>Client</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {invoices.map(inv => (
//               <tr key={inv.id}>
//                 <td>{inv.invoiceNumber}</td>
//                 <td>{inv.clientName}</td>
//                 <td>₹ {inv.totalAmount}</td>
//                 <td>
//                   <span className="px-2 py-1 text-xs bg-gray-200 rounded">
//                     {inv.status}
//                   </span>
//                 </td>

//                 <td className="relative">
//                   <button onClick={() => setOpenMenu(inv.id)}>⋮</button>

//                   {openMenu === inv.id && (
//                     <div className="absolute right-0 bg-white border shadow-xl rounded w-48 z-50">
//                       <Action
//                         label="View Invoice"
//                         onClick={() =>
//                           window.open(`/invoices/${inv.id}`, "_blank")
//                         }
//                       />
//                       <Action
//                         label="Download PDF"
//                         onClick={() => window.open(inv.pdfUrl)}
//                       />
//                       <Action
//                         label="Mark as SENT"
//                         onClick={() =>
//                           updateInvoiceStatus(companyId, inv.id, "SENT")
//                         }
//                       />
//                       <Action
//                         label="Email Invoice"
//                         onClick={() => emailInvoice(companyId, inv.id)}
//                       />
//                       <Action
//                         label="Delete"
//                         danger
//                         onClick={() => handleDelete(inv.id)}
//                       />
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>
//     </CompanyAdminLayout>
//   );
// }

// const Action = ({ label, onClick, danger }) => (
//   <button
//     onClick={onClick}
//     className={`w-full px-4 py-2 text-left text-sm
//       ${danger
//         ? "text-red-600 hover:bg-red-50"
//         : "hover:bg-gray-100"}
//     `}
//   >
//     {label}
//   </button>
// );
