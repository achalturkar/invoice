import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getLoggedInUser } from "../../../api/authApi";
import { getClients, deleteClient } from "../../../api/clientApi";
import { Link, useNavigate } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const navigate = useNavigate();

  const loadClients = async (cid) => {
    const data = await getClients(cid);
    setClients(data);
  };

  useEffect(() => {
    const load = async () => {
      const user = await getLoggedInUser();
      setCompanyId(user.company);
      loadClients(user.company);
    };
    load();
  }, []);

  const handleDelete = async (clientId) => {
    if (!window.confirm("Delete this client?")) return;

    await deleteClient(companyId, clientId);
    loadClients(companyId);
    setOpenMenu(null);
  };

  return (
    <CompanyAdminLayout>
      <div className="h-full max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Clients</h2>

          <Link
            to="/clients/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            + Add Client
          </Link>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto min-h-screen">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Client</th>

                <th className="hidden md:table-cell">Email</th>
                <th className="hidden lg:table-cell">Phone</th>
                <th className="hidden lg:table-cell">GST</th>

                <th>State</th>

                <th className="hidden xl:table-cell">
                  Billing Address
                </th>

                <th className="text-right pr-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((c) => (
                <React.Fragment key={c.id}>
                  <tr
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === c.id ? null : c.id
                      )
                    }
                  >
                    {/* CLIENT */}
                    <td className="p-3">
                      <p className="font-semibold text-gray-800">
                        {c.clientName}
                      </p>
                      <p className="text-xs text-gray-500 md:hidden">
                        {c.email || "-"}
                      </p>
                    </td>

                    <td className="hidden md:table-cell">
                      {c.email || "-"}
                    </td>

                    <td className="hidden lg:table-cell">
                      {c.phone || "-"}
                    </td>

                    <td className="hidden lg:table-cell">
                      {c.gstNo || "-"}
                    </td>

                    <td>
                      {c.stateName || "-"}
                    </td>

                    <td className="hidden xl:table-cell max-w-xs truncate">
                      {c.billingAddress || "-"}
                    </td>

                    {/* ACTIONS */}
                    <td
                      className="text-right pr-4 relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === c.id ? null : c.id)
                        }
                        className="text-xl px-2 hover:text-gray-700"
                      >
                        ⋮
                      </button>

                      {openMenu === c.id && (
                        <div className="absolute right-2 top-8 bg-white border rounded-lg shadow-md w-44 z-10">
                          <MenuItem
                            label="View Client"
                            onClick={() =>
                              navigate(`/clients/view/${c.id}`)
                            }
                          />
                          <MenuItem
                            label="Edit Client"
                            onClick={() =>
                              navigate(`/clients/edit/${c.id}`)
                            }
                          />
                          <MenuItem
                            label="Create Invoice"
                            onClick={() =>
                              navigate(`/invoices/new?client=${c.id}`)
                            }
                          />
                          <MenuItem
                            label="View Invoices"
                            onClick={() =>
                              navigate(`/invoices?client=${c.id}`)
                            }
                          />
                          <MenuItem
                            label="Delete"
                            danger
                            onClick={() => handleDelete(c.id)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* MOBILE EXPANDED ROW */}
                  {expandedRow === c.id && (
                    <tr className="md:hidden bg-gray-50">
                      <td colSpan="7" className="p-4 text-xs space-y-2">
                        <p><b>Email:</b> {c.email || "-"}</p>
                        <p><b>Phone:</b> {c.phone || "-"}</p>
                        <p><b>GST:</b> {c.gstNo || "-"}</p>
                        <p><b>Billing:</b> {c.billingAddress || "-"}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-400">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </CompanyAdminLayout>
  );
};

export default ClientList;

/* ================= MENU ITEM ================= */

const MenuItem = ({ label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
      danger ? "text-red-600 hover:bg-red-50" : ""
    }`}
  >
    {label}
  </button>
);
