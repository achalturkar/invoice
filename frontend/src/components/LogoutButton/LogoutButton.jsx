import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      // 🔥 Clear frontend state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("companyId");

      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded
                 hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
