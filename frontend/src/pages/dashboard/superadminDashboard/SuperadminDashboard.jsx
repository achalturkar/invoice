import React from "react";
import { useState, useEffect } from "react";
import SuperAdminLayout from "../../../layout/SuperAdminLayout";
import ProfileMenu from "../../../components/ProfileMenu/ProfileMenu";
import ListCompanies from "../../../components/SuperAdmin/Companies/ListCompanies";

const SuperadminDashboard = () =>{

const [companyCount, setCompanyCount] = useState(0);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCompanyCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/super-admin/companies-count",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();
        setCompanyCount(data);
      } catch (error) {
        console.error("Failed to load company count", error);
      }
    };

    fetchCompanyCount();
  }, [token]);


  

    return(

       <SuperAdminLayout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          Total Companies
            <h1 className="text-3xl font-bold mt-2">
            {companyCount}
          </h1>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          Company Admins
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          Active Subscriptions
        </div>
      </div>

      <ListCompanies/>
    </SuperAdminLayout>
    )

}

export default SuperadminDashboard;