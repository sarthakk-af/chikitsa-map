// src/pages/admin/AdminLogin.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "../../services/api";

// ✅ Validation Schema
const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AdminLoginFields = z.infer<typeof adminLoginSchema>;

interface JwtPayload {
  role: string;
}

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminLoginFields>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFields) => {
    setLoading(true);
    try {
      const res = await api.post("/api/admins/loginAdmin", data);
      const token = res.data.token;

      // ⛔ Secure decoding only for role validation (no sensitive info)
      const decoded: JwtPayload = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role !== "admin") {
        alert("Access denied: You are not an admin!");
        return;
      }

      localStorage.setItem("token", token);
      alert("Login successful!");
      navigate("/admins/dashboard");
      reset();
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8"
      >
        <h2 className="text-3xl font-bold text-blue-900 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              {...register("email")}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center bg-teal-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Please wait...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/* Back Home */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-teal-500 hover:underline"
            aria-label="Go back to home"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
