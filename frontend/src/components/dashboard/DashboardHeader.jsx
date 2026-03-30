
import React from "react";
import { useAuth } from "../../auth/AuthContext";

const DashboardHeader = ({ title, subtitle }) => {
    const { auth } = useAuth();


    return (
        <div className="mb-6">

            <h1 className="text-3xl font-bold">
                {auth?.companyName
                    ? `${auth.companyName} Dashboard`
                    : "Dashboard"}
            </h1>

            {/* <p>ID: {auth?.companyId}</p> */}

            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
    );
};

export default DashboardHeader;
