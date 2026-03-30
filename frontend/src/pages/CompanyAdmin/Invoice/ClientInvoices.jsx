import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { clientAllInvoice } from "../../../api/invoiceApi";
import Pagination from "../../../components/common/Pagination/Pagination";
import { formatDate } from "../../../utils/dateUtils";

const ClientInvoices = () => {
    const { companyId, clientId } = useParams();
    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);
    const [clientName, setClientName] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [openMenu, setOpenMenu] = useState(null);

    useEffect(() => {
        clientAllInvoice(companyId, clientId, page, 10)
            .then((data) => {
                setInvoices(data.content);
                setTotalPages(data.totalPages);

                // ✅ get client name from first invoice
                if (data.content.length > 0) {
                    setClientName(data.content[0].clientName);
                }
            })
            .catch(console.error);
    }, [companyId, clientId, page]);

    return (
        <CompanyAdminLayout>
            <div className="bg-white p-6 rounded-xl shadow max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-gray-800">
                        {clientName || "Client"} Invoices
                    </h2>

                    <button
                        onClick={() => navigate(`/invoices/new?client=${clientId}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Create Invoice
                    </button>
                </div>

                {/* TABLE WRAPPER (Mobile Scroll) */}
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-[900px] w-full border-collapse text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="border p-3 text-left">Invoice No</th>
                                <th className="border p-3">Invoice Date</th>
                                <th className="border p-3">Total</th>
                                <th className="border p-3">Status</th>
                                <th className="border p-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoices.map((i) => (
                                <tr
                                    key={i.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="border p-3 font-medium">
                                        {i.invoiceNumber}
                                    </td>

                                    <td className="border p-3 text-center">
                                        {formatDate(i.invoiceDate)}
                                    </td>

                                    <td className="border p-3 text-center font-semibold">
                                        ₹ {i.totalAmount}
                                    </td>

                                    <td className="border p-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium
                        ${i.status === "PAID"
                                                    ? "bg-green-100 text-green-700"
                                                    : i.status === "DRAFT"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }
                      `}
                                        >
                                            {i.status}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td
                                        className="border p-3 text-right relative"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenMenu(openMenu === i.id ? null : i.id)
                                            }
                                            className="px-2 text-xl"
                                        >
                                            ⋮
                                        </button>

                                        {openMenu === i.id && (
                                            <div className="absolute right-2 top-10 bg-white border rounded-lg shadow-md w-40 z-20">
                                                <ActionItem
                                                    label="View Invoice"
                                                    onClick={() =>
                                                        navigate(`/invoices/view/${i.id}`)
                                                    }
                                                />
                                                <ActionItem
                                                    label="Download PDF"
                                                    onClick={() =>
                                                        window.open(
                                                            `${process.env.REACT_APP_API_URL}/files/${i.pdfPath}`,
                                                            "_blank"
                                                        )
                                                    }
                                                />
                                                <ActionItem
                                                    label="Edit Invoice"
                                                    onClick={() =>
                                                        navigate(`/invoices/edit/${i.id}`)
                                                    }
                                                />
                                                <ActionItem
                                                    label="Delete"
                                                    danger
                                                    onClick={() =>
                                                        window.confirm("Delete invoice?")
                                                    }
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {invoices.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center p-6 text-gray-400"
                                    >
                                        No invoices found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    maxVisible={3}
                />
            </div>
        </CompanyAdminLayout>
    );
};

export default ClientInvoices;

/* ================= ACTION ITEM ================= */

const ActionItem = ({ label, onClick, danger }) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${danger ? "text-red-600 hover:bg-red-50" : ""
            }`}
    >
        {label}
    </button>
);
