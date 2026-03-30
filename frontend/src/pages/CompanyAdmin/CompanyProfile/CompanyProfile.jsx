
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import ImageBox from "../../../components/CompanyAdmin/ImageBox/ImageBox";

import {
    getCompanyById,
} from "../../../api/companyApi";
import { getCompanyAddresses } from "../../../api/companyaddressApi";
import CompanyAddressCard from "../../../components/CompanyAdmin/Address/CompanyAddressCard";
import { useAuth } from "../../../auth/AuthContext";

/* ===================== MAIN ===================== */

const CompanyProfile = () => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);

    const navigate = useNavigate();

    const {auth} = useAuth();

    useEffect(() => {
        const loadAll = async () => {
            try {
                // const user = await getLoggedInUser();

                /* COMPANY */
                const companyData = await getCompanyById(auth?.companyId);
                setCompany(companyData);


            } catch (err) {
                console.error("Failed to load company profile", err);
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, []);

    useEffect(() => {
        const loadAdd = async () => {
            try {
                // const user = await getLoggedInUser();

                getCompanyAddresses(auth?.companyId)
                    .then(setAddresses)
                    .catch(console.error);
            } catch (err) {
                console.error("Failed to load company profile", err);
            }
        }
        loadAdd();
    }, []);

    /* ===================== STATES ===================== */

    if (loading) {
        return (
            <CompanyAdminLayout>
                <div className="flex justify-center items-center h-60 text-gray-500">
                    Loading company profile...
                </div>
            </CompanyAdminLayout>
        );
    }

    if (!company) {
        return (
            <CompanyAdminLayout>
                <div className="text-center text-red-500 mt-20">
                    Failed to load company
                </div>
            </CompanyAdminLayout>
        );
    }

    /* ===================== UI ===================== */

    return (
        <CompanyAdminLayout>
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-8 space-y-12">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {company.name}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {company.address || "—"}
                        </p>

                        <div className="mt-2 inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs">
                            <span className="font-semibold">Company Code:</span>
                            <span>{company.companyCode || "N/A"}</span>
                        </div>
                    </div>

                    <Link
                        to="/edit/profile"
                        className="self-start bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-indigo-700"
                    >
                        Edit Profile
                    </Link>
                </div>

                {/* BRANDING */}
                <Section title="Branding">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ImageBox
                            label="Company Logo"
                            companyId={company.id}
                            type="logo"
                        />

                        <ImageBox
                            label="Company Stamp"
                            companyId={company.id}
                            type="stamp"
                        />

                        <ImageBox
                            label="Authorized Signature"
                            companyId={company.id}
                            type="sign"
                        />

                    </div>
                </Section>

                {/* BASIC INFO */}
                <Section title="Basic Information">
                    <Info label="Email" value={company.email} />
                    <Info label="Phone" value={company.phone} />
                    <Info label="Website" value={company.webUrl} />
                    <Info label="Status" value={company.status} />
                </Section>

                {/* LEGAL */}
                <Section title="Legal Information">
                    <Info label="GST Number" value={company.gstNo} />
                    <Info label="PAN Number" value={company.panNo} />
                    <Info label="LUT Number" value={company.lutNo} />
                    <Info label="CIN Number" value={company.cinNo} />
                    <Info label="State" value={company.state} />
                    <Info label="State Code" value={company.stateCode} />
                </Section>


                     <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Company Addresses</h2>
                        <button
                          className="btn-primary"
                          onClick={() => navigate("address/new")}
                        >
                          Add Address
                        </button>
                      </div>
                
                      {addresses.map(addr => (
                        <CompanyAddressCard
                          key={addr.id}
                          address={addr}
                          onEdit={() => navigate(`address/edit/${addr.id}`)}
                        />
                      ))}
                    </div>

                {/* BANK */}
                <Section title="Bank Details">

                    <button
                        className="bg-green-500 p-2 rounded-lg text-md text-white font-semibold"
                        onClick={() => navigate("/company/bank-accounts/all")}
                    >
                        All Bank Accounts
                    </button>

                </Section>

            </div>
        </CompanyAdminLayout>
    );
};

export default CompanyProfile;

/* ===================== UI HELPERS ===================== */

const Section = ({ title, children }) => (
    <div>
        <h3 className="text-sm font-semibold mb-4 text-gray-700 uppercase tracking-wide">
            {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children}
        </div>
    </div>
);

const Info = ({ label, value }) => (
    <div className="bg-gray-50 border rounded-xl p-4">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold mt-1 text-gray-800">
            {value || "—"}
        </p>
    </div>
);
