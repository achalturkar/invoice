import React, { useEffect, useRef, useState } from "react";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import {
  deleteBankAccount,
  getBankAccounts,
  updateBankAccountStatus,
} from "../../../api/bankAccountApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const BankAccountList = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const navigate = useNavigate();
  const { auth } = useAuth();
  const companyId = auth?.companyId;
  const menuRef = useRef();

  useEffect(() => {
    loadBanks();
  }, [companyId]);

  const loadBanks = async () => {
    try {
      const data = await getBankAccounts(companyId);
      setBanks(data);
    } catch (err) {
      console.error("Failed to load bank accounts");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, status) => {
    await updateBankAccountStatus(id, status);
    setBanks(banks.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await deleteBankAccount(companyId, id);
    setBanks(banks.filter(b => b.id !== id));
  };

  const maskAccount = (acc) => {
    if (!acc) return "-";
    return "XXXXXX" + acc.slice(-4);
  };

  const statusBadge = (status) => {
    const styles =
      status === "ACTIVE"
        ? "bg-green-100 text-green-700"
        : status === "INACTIVE"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles}`}>
        {status}
      </span>
    );
  };

  return (
    <CompanyAdminLayout>
      <div className="bg-white p-6 rounded-2xl shadow">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Bank Accounts</h2>
          <button
            onClick={() => navigate("/company/bank-accounts/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Bank Account
          </button>
        </div>

        {loading ? (
          <div className="text-center py-6">Loading...</div>
        ) : banks.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No bank accounts found.
          </div>
        ) : (
            <table className="w-full text-sm overflow-x-auto min-w-[700px]">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">Bank</th>
                  <th className="text-left">Account No</th>
                  <th className="text-left">IFSC</th>
                  <th className="text-left">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {banks.map(bank => (
                  <tr key={bank.id} className="border-t hover:bg-gray-50">

                    <td className="p-3 font-medium">
                      {bank.bankName}
                      <div className="text-xs text-gray-500">
                        {bank.bankBranch}
                      </div>
                    </td>

                    <td>{maskAccount(bank.bankAccountNo)}</td>

                    <td>{bank.bankIfsc}</td>

                    <td>{statusBadge(bank.status)}</td>

                    <td className="relative text-center">

                      {/* 3 Dot Button */}
                      <button
                        onClick={() =>
                          setActiveMenu(activeMenu === bank.id ? null : bank.id)
                        }
                        className="px-2 py-1 text-gray-600 hover:text-black"
                      >
                        ⋮
                      </button>

                      {/* Dropdown */}
                      {activeMenu === bank.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10"
                        >
                          <button
                            onClick={() =>
                              navigate(`/company/bank-accounts/view/${bank.id}`)
                            }
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/company/bank-accounts/${bank.id}`)
                            }
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </button>

                          {bank.status === "ACTIVE" ? (
                            <button
                              onClick={() =>
                                changeStatus(bank.id, "INACTIVE")
                              }
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-yellow-600"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                changeStatus(bank.id, "ACTIVE")
                              }
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
                            >
                              Activate
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(bank.id)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}

      </div>
    </CompanyAdminLayout>
  );
};

export default BankAccountList;
