import React, { useEffect, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { getClients, deleteClient } from "../../../api/clientApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

/* ================= UTIL ================= */

const getPrimaryAddress = (addresses, type) => {
  if (!Array.isArray(addresses)) return null;
  return addresses.find(
    (a) => a.addressType === type && a.isPrimary
  );
};

/* ================= COMPONENT ================= */

const ClientList = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // ✅ FIXED

  /* ---------- LOAD CLIENTS ---------- */
  const loadClients = async () => {
    try {
      const data = await getClients(auth.companyId);
      setClients(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load clients");
    }
  };

  useEffect(() => {
    if (auth?.companyId) loadClients();
  }, [auth?.companyId]);

  /* ---------- DELETE CLIENT ---------- */
  const handleDelete = async (clientId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(clientId);

      await deleteClient(auth.companyId, clientId);

      // Remove from UI
      setClients((prev) => prev.filter((c) => c.id !== clientId));
      setOpenMenu(null);
    } catch (e) {
      alert("Failed to delete client");
    } finally {
      setDeletingId(null);
    }
  };

  /* ---------- CLOSE MENU ON OUTSIDE CLICK ---------- */
  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <CompanyAdminLayout>
      {/* <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl"> */}

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Clients</h2>

          <Link
            to="/clients/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            + Add Client
          </Link>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-auto relative">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border-r">Client</th>
                <th className="border-r">Email</th>
                <th className="border-r">GST</th>
                <th className="border-r">Billing Location</th>
                <th className="border-r">Addresses</th>
                <th className="text-right pr-4 border-r">Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((c) => {
                const billing = getPrimaryAddress(
                  c.clientAddresses,
                  "BILLING"
                );

                return (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    
                    {/* CLIENT */}
                    <td className="p-2 border-r">
                      <Link
                        to={`/clients/view/${c.id}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {c.clientName}
                      </Link>
                      <div className="text-xs text-gray-500">
                        {billing?.city || "-"},{" "}
                        {billing?.stateName || "-"}
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="border-r p-2">{c.email || "-"}</td>

                    {/* GST */}
                    <td className="border-r p-2 ">
                      {c.gstNo ? (
                        <span className=" px-1 bg-green-100 text-green-700 rounded text-xs">
                          {c.gstNo}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* BILLING */}
                    <td className="border-r p-1">
                      {billing
                        ? `${billing.city}, ${billing.stateCode}`
                        : "-"}
                    </td>

                    {/* ADDRESS COUNT */}
                    <td className="text-xs border-r p-1">
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {c.clientAddresses?.length || 0} addresses
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td
                      className="text-right pr-4 relative border-r p-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === c.id ? null : c.id)
                        }
                        className="text-xl"
                      >
                        ⋮
                      </button>

                      {openMenu === c.id && (
                        <div className="absolute right-0 top-8 bg-white border rounded shadow w-48 z-100">
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
                            label="Addresses"
                            onClick={() =>
                              navigate(`/clients/${c.id}/addresses`)
                            }
                          />
                          <MenuItem
                            label="Create Invoice"
                            onClick={() =>
                              navigate(`/invoices/new?client=${c.id}`)
                            }
                          />

                          {/* DELETE */}
                          <MenuItem
                            label={
                              deletingId === c.id
                                ? "Deleting..."
                                : "Delete Client"
                            }
                            danger
                            onClick={() => handleDelete(c.id)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {clients.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-400"
                  >
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      {/* </div> */}
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
