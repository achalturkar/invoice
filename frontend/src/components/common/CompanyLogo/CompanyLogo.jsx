import React, { useEffect, useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { getCompanyLogo } from "../../../api/companyApi";

const CompanyLogo = ({ size = 32, className = "" }) => {
  const { auth } = useAuth();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let objectUrl;

    const loadLogo = async () => {
      if (!auth?.companyId) return;

      try {
        const blob = await getCompanyLogo(auth.companyId);
        objectUrl = URL.createObjectURL(blob);
        setLogo(objectUrl);
      } catch (err) {
        console.error("Logo load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLogo();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [auth?.companyId]);

  if (loading) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-slate-700 animate-pulse rounded ${className}`}
      />
    );
  }

  if (!logo) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-slate-600 flex items-center justify-center text-xs rounded ${className}`}
      >
        LOGO
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt="Company Logo"
      style={{ width: size, height: size }}
      className={`object-contain rounded ${className}`}
    />
  );
};

export default CompanyLogo;
