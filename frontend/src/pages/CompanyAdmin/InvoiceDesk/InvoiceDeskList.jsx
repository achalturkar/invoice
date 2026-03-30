import React, { useEffect, useRef, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import {
  allInvoiceDesk,
  deleteInvoiceDesk,
  viewInvoice,
  downloadInvoice,
  invoiceFinal,
} from "../../../api/invoiceDesk";
import {
  openPdfInNewTab,
  downloadPdfFile,
} from "../../../utils/openPdfInNewTab";
import { formatDate } from "../../../utils/dateUtils";

const InvoiceDeskList = () => {
  const [invoiceDesk, setInvoiceDesk] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  /* ================= LOAD ================= */
  const loadInvoiceDesk = async () => {
    try {
      setLoading(true);
      const res = await allInvoiceDesk(companyId);
      setInvoiceDesk(res);
    } catch (error) {
      console.error("Error loading invoices", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) loadInvoiceDesk();
  }, [companyId]);


  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (invoiceId) => {
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;

    try {
      await deleteInvoiceDesk(companyId, invoiceId);
      setOpenMenuId(null);
          await loadInvoiceDesk();

      //   setInvoiceDesk((prev) =>
      //     prev.filter((i) => i.id !== invoiceId)
      //   );
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const finalize = async (invoiceId) => {
    if (!window.confirm("Finalize this invoice?")) return;

    try {
      await invoiceFinal(companyId, invoiceId);
        setOpenMenuId(null);

    // ✅ Reload fresh data
    await loadInvoiceDesk();

      // ✅ Update status locally without reload
      setInvoiceDesk((prev) =>
        prev.map((inv) =>
          inv.invoiceId === invoiceId
            ? { ...inv, status: "FINAL" }
            : inv
        )
      );

      setOpenMenuId(null);

    } catch (err) {
      console.error("Finalize failed", err);
      alert("Failed to finalize invoice");
    }
  };


  return (
    <CompanyAdminLayout>
      <div className="p-2 md:p-6">
        <div className="flex justify-between items-center  mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Invoice Desk
          </h2>

          <button
            onClick={() => navigate("/invoices/desk/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Create Invoice
          </button>
        </div>

        {!loading && invoiceDesk.length > 0 && (
          <div className="bg-white shadow-sm rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Invoice No</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Client</th>
                  <th className="px-6 py-4 text-left">Supply</th>
                  <th className="px-6 py-4 text-left">Tax Summary</th>
                  <th className="px-6 py-4 text-left">Total</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {invoiceDesk.map((inv) => (
                  <tr key={inv.invoiceId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-6 py-4">{ formatDate(inv.invoiceDate)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${inv.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {inv.client?.clientName}
                    </td>
                    <td className="px-6 py-4">
                      {inv.supplyType}
                    </td>
                    <td className="px-6 py-4">
                      {/* {inv.taxSummary[0].taxCode} */}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {inv.currency?.symbol} {inv.grandTotal}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === inv.invoiceId ? null : inv.invoiceId
                          )
                        }
                        className="px-2 py-1 rounded hover:bg-gray-200"
                      >
                        ⋮
                      </button>

                      {openMenuId === inv.invoiceId && (
                        <div
                          ref={menuRef}
                          className="absolute right-2 mt-2 w-48 bg-white border rounded-lg shadow-lg z-[9999]"
                        >
                          <MenuItem
                            label="View"
                            onClick={async () => {
                              const blob = await viewInvoice(
                                companyId,
                                inv.invoiceId
                              );
                              openPdfInNewTab(blob);
                            }}
                          />

                          {inv.status === "DRAFT" && (
                            <>
                              <MenuItem
                                label="Edit"
                                onClick={() =>
                                  navigate(
                                    `/company/invoice-desk/edit/${inv.invoiceId}`
                                  )
                                }
                              />
                              <MenuItem
                                label="Finalize"
                                onClick={() =>
                                  finalize(inv.invoiceId)
                                }
                              />
                              <MenuItem
                                label="Delete"
                                danger
                                onClick={() =>
                                  handleDelete(inv.invoiceId)
                                }
                              />
                            </>
                          )}

                          <MenuItem
                            label="Download PDF"
                            onClick={async () => {
                              const blob =
                                await downloadInvoice(
                                  companyId,
                                  inv.invoiceId
                                );
                              downloadPdfFile(
                                blob,
                                `invoice-${inv.invoiceNumber}.pdf`
                              );
                            }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CompanyAdminLayout>
  );
};

const MenuItem = ({ label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm ${danger
        ? "text-red-600 hover:bg-red-50"
        : "hover:bg-gray-100"
      }`}
  >
    {label}
  </button>
);

export default InvoiceDeskList;
