import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyAdminLayout from "../../../layout/CompanyAdminLayout/CompanyAdminLayout";
import { resolveImageUrl } from "../../../utils/imageUtils";
import ImageBox from "../../../components/CompanyAdmin/ImageBox/ImageBox";

const CompanyProfile = () => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bank, setBank] = useState(null);

    useEffect(() => {
        const loadCompanyAndBank = async () => {
            try {
                // 1️⃣ get logged-in user
                const userRes = await fetch("http://localhost:8080/auth/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                const user = await userRes.json();

                // 2️⃣ get company
                const companyRes = await fetch(
                    `http://localhost:8080/api/company/${user.company}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
                setCompany(await companyRes.json());

                // 3️⃣ get bank details (VERY IMPORTANT)
                const bankRes = await fetch(
                    `http://localhost:8080/api/company/${user.company}/bank-details`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );

                if (bankRes.ok) {
                    setBank(await bankRes.json());
                } else {
                    setBank(null); // no bank details yet
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCompanyAndBank();
    }, []);


    useEffect(() => {
        const loadCompany = async () => {
            try {
                const userRes = await fetch("http://localhost:8080/auth/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                const user = await userRes.json();

                const companyRes = await fetch(
                    `http://localhost:8080/api/company/${user.company}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );

                setCompany(await companyRes.json());
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCompany();
    }, []);

    if (loading) {
        return (
            <CompanyAdminLayout>
                <div className="flex justify-center items-center h-40 text-gray-500">
                    Loading company profile...
                </div>
            </CompanyAdminLayout>
        );
    }

    return (
        <CompanyAdminLayout>
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6 space-y-10">

                {/* HEADER */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold">{company.name}</h2>
                        <p className="text-sm text-gray-500">{company.address}</p>
                    </div>

                    <Link
                        to="/edit/profile"
                        className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        ✏️ Edit Profile
                    </Link>
                </div>

                {/* LOGO + INFO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ImageBox label="Company Logo" url={company.logoUrl} />

                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        <Info label="Email" value={company.email} />
                        <Info label="Phone" value={company.phone} />
                        <Info label="Website" value={company.webUrl} />
                        <Info label="Status" value={company.status} />
                    </div>
                </div>

                {/* LEGAL */}
                <Section title="Legal Information">
                    <Info label="GST Number" value={company.gstNo} />
                    <Info label="PAN Number" value={company.panNo} />
                    <Info label="State" value={company.state} />
                    <Info label="State Code" value={company.stateCode} />
                </Section>

                <Section title="Bank Details">
                    {bank ? (
                        <>
                            <Info label="Bank Name" value={bank.bankName} />
                            <Info label="Account Holder" value={bank.bankAccountName} />
                            <Info label="Account No" value={bank.bankAccountNo} />
                            <Info label="IFSC" value={bank.bankIfsc} />
                            <Info label="Bank Branch" value={bank.bankBranch} />
                            <Info label="Bank Swift Code" value={bank.swiftCode} />
                            <Info label="TAN" value={bank.tanNo} />
                            <Info label="PAN" value={bank.panNo} />

                            <div className="col-span-full flex justify-end mt-2">
                                <Link
                                    to="/edit/bank"
                                    className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700"
                                >
                                    Edit Bank Details
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="col-span-full flex justify-between items-center">
                            <p className="text-sm text-gray-400">
                                Bank details not added yet
                            </p>
                            <Link
                                to="/edit/bank"
                                className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700"
                            >
                                Add Bank Details
                            </Link>
                        </div>
                    )}
                </Section>



                {/* AUTH */}
                <Section title="Authorization">
                    <ImageBox label="Company Stamp" url={company.stampUrl} />
                    <ImageBox label="Authorized Signature" url={company.signUrl} />
                </Section>
            </div>
        </CompanyAdminLayout>
    );
};

export default CompanyProfile;
const Section = ({ title, children }) => (
    <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
);

const Info = ({ label, value }) => (
    <div className="bg-gray-50 border rounded-lg p-4">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold mt-1">{value || "-"}</p>
    </div>
);

