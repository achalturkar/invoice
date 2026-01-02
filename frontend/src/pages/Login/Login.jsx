import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 AUTO REDIRECT IF TOKEN EXISTS
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (token && token !== "undefined" && role) {
      if (role === "SUPER_ADMIN") {
        navigate("/super-admin/dashboard", { replace: true });
      } else if (role === "COMPANY_ADMIN") {
        navigate("/company-admin/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const { token, role, companyId } = response.data;

      if (!token) throw new Error("Token missing");

      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("companyId", companyId);

      if (role === "SUPER_ADMIN") {
        navigate("/super-admin/dashboard", { replace: true });
      } else if (role === "COMPANY_ADMIN") {
        navigate("/company-admin/dashboard", { replace: true });
      } else {
        navigate("/unauthorized", { replace: true });
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Invoice Portal Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          {/* Password with show/hide */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          © {new Date().getFullYear()} Invoice Portal
        </p>
      </div>
    </div>
  );
};

export default Login;
