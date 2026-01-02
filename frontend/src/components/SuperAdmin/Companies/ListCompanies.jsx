import React, { useEffect, useState } from "react";

const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const token = localStorage.getItem("accessToken"); 

  const fetchAllCompanies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/super-admin/all-companies",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }

      const data = await response.json(); 
      setCompanies(data);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    }
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <table border="1" cellPadding="20" className="p-40 mt-8">
      <thead className="border p-4">
        <tr className="p-4 bg-blue-100">
          <th className="p-4 ">Sr No.</th>
          <th className="p-4 ">Company Name</th>
          <th className="p-4 ">Email</th>
          <th className="p-4 ">Mobile</th>
          <th className="p-4 ">Admin</th>
          <th className="p-4 ">Status</th>
        </tr>
      </thead>

      <tbody>
        {companies.length === 0 ? (
          <tr>
            <td colSpan="8">No companies found</td>
          </tr>
        ) : (
          companies.map((company, index) => (
            <tr key={company.id} className="p-4 border b-1">
              <td className="p-4 ">{index + 1}</td>
              <td className="p-4 ">{company.name}</td>
              <td className="p-4 ">{company.email}</td>
              <td className="p-4 ">{company.phone}</td>
              <td className="p-4 ">{company.user}</td>
              <td className="p-4 ">{company.active ? "Active" : "Inactive"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ListCompanies;
