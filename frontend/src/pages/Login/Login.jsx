// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../auth/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { loadUser } = useAuth();


//   // 🔥 AUTO REDIRECT IF TOKEN EXISTS
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const role = localStorage.getItem("role");

//     if (token && token !== "undefined" && role) {
//       if (role === "SUPER_ADMIN") {
//         navigate("/super-admin/dashboard", { replace: true });
//       } else if (role === "COMPANY_ADMIN") {
//         navigate("/company-admin/dashboard", { replace: true });
//       }
//        else if (role === "EMPLOYEE") {
//         navigate("/employee/dashboard", { replace: true });
//       }
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, role, companyId } = response.data;

//       if (!token) throw new Error("Token missing");

//       localStorage.setItem("accessToken", token);
      
//       await loadUser();

//       if (role === "SUPER_ADMIN") {
//         navigate("/super-admin/dashboard", { replace: true });
//       } else if (role === "COMPANY_ADMIN") {
//         navigate("/company-admin/dashboard", { replace: true });
//       }else if (role === "EMPLOYEE") {
//         navigate("/employee/dashboard", { replace: true });
//       } else {
//         navigate("/unauthorized", { replace: true });
//       }
//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

// return (
//   <div className="min-h-screen flex bg-gray-100">
//     {/* LEFT PANEL */}
//     <div className="hidden lg:flex w-1/2 bg-indigo-700 text-white flex-col justify-center px-16">
//       <h1 className="text-4xl font-bold mb-4">
//         Enterprise Workforce Platform
//       </h1>
//       <p className="text-indigo-100 text-lg">
//         Manage payroll, leave, invoices and HR operations
//         in one unified secure system.
//       </p>

//       <div className="mt-10 space-y-3 text-indigo-200 text-sm">
//         <p>✔ Secure Role-Based Access</p>
//         <p>✔ Multi-Company Architecture</p>
//         <p>✔ Real-Time Payroll & Leave Tracking</p>
//       </div>
//     </div>

//     {/* RIGHT PANEL */}
//     <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
//       <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//           Sign in to your account
//         </h2>

//         <p className="text-sm text-gray-500 mb-6">
//           Use your registered company credentials
//         </p>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-sm text-gray-600">Email</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Password</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-xs text-gray-400 mt-6 text-center">
//           © {new Date().getFullYear()} Workforce Platform
//         </p>
//       </div>
//     </div>
//   </div>
// );

// };

// export default Login;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { auth, loadUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect automatically when auth state updates
  useEffect(() => {
    if (auth?.role) {
      redirectByRole(auth.role);
    }
  }, [auth]);

  const redirectByRole = (role) => {
    switch (role) {
      case "SUPER_ADMIN":
        navigate("/super-admin/dashboard", { replace: true });
        break;
      case "COMPANY_ADMIN":
        navigate("/company-admin/dashboard", { replace: true });
        break;
      case "EMPLOYEE":
        navigate("/employee/dashboard", { replace: true });
        break;
      default:
        navigate("/unauthorized", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      const { token } = response.data;

      if (!token) throw new Error("Token missing");

      // ✅ Store only access token
      localStorage.setItem("accessToken", token);

      // ✅ Load user from backend (/auth/me)
      await loadUser();

      // 🚫 No manual redirect here
      // Redirect happens automatically via useEffect

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-indigo-700 text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">
          Enterprise Workforce Platform
        </h1>
        <p className="text-indigo-100 text-lg">
          Manage payroll, leave, invoices and HR operations
          in one secure unified system.
        </p>

        <div className="mt-10 space-y-3 text-indigo-200 text-sm">
          <p>✔ Secure Role-Based Access</p>
          <p>✔ Multi-Company Architecture</p>
          <p>✔ Real-Time Payroll & Leave Tracking</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Sign in to your account
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Use your registered company credentials
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-medium transition
                ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-6 text-center">
            © {new Date().getFullYear()} Workforce Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
