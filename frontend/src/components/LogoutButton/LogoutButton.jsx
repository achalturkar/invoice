import React from "react";
import { useAuth } from "../../auth/AuthContext";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <div
      onClick={logout}
      className="flex gap-2 items-center font-semibold cursor-pointer text-red-500"
    >
      <LogOut size={16} />
      Logout
    </div>
  );
};

export default LogoutButton;
