import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser, loginUser } from "../services/api";
import { loginSchema, registerSchema } from "../lib/schemas";
import { useAuth } from "../hooks/useAuth";
import { BackButton } from "../components/common/BackButton";

/**
 * Auth - Trang đăng nhập và đăng ký
 * - 2 tabs: Login / Register
 * - Sử dụng react-hook-form với Zod validation
 * - Sử dụng AuthContext để login (không cần reload trang)
 * Located in: src/pages/ (theo README structure)
 */

export function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login"); // "login" or "register"
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the correct schema based on active tab
  const currentSchema = activeTab === "login" ? loginSchema : registerSchema;

  // Setup react-hook-form with zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currentSchema),
    mode: "onBlur", // Validate on blur
  });

  // Reset form when schema changes (tab switch)
  useEffect(() => {
    reset();
    setApiError("");
    setSuccess("");
  }, [activeTab, reset]);

  // Handle form submission (only runs if validation passes)
  const onSubmit = async (data) => {
    setApiError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (activeTab === "register") {
        // Call register API
        await registerUser({
          username: data.username,
          email: data.email,
          password: data.password,
        });
        setSuccess("Registration successful! Please login.");
        // Switch to login tab after success
        setTimeout(() => {
          setActiveTab("login");
        }, 1500);
      } else {
        // Call login API
        const result = await loginUser(data.username, data.password);

        // Use AuthContext login (updates state + localStorage)
        if (result.token && result.user) {
          login(result.user, result.token);
        }

        setSuccess("Login successful! Redirecting...");
        // Navigate without page reload
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Switch tab
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  // Common input classes
  const inputClass = (hasError) =>
    `w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${
      hasError
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-slate-500"
    }`;

  return (
    <main className="flex-1 bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <BackButton to="/home" label="Back to Home" className="mb-6" />
        {/* Auth Card - Glassmorphism */}
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-slate-700">
          {/* Tabs - Gradient */}
          <div className="flex">
            <button
              type="button"
              onClick={() => switchTab("login")}
              className={`flex-1 py-3.5 text-center font-semibold transition-all ${
                activeTab === "login"
                  ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                  : "bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchTab("register")}
              className={`flex-1 py-3.5 text-center font-semibold transition-all ${
                activeTab === "register"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                  : "bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                className={inputClass(errors.username)}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email (Register only) */}
            {activeTab === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={inputClass(errors.email)}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className={inputClass(errors.password)}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password (Register only) */}
            {activeTab === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className={inputClass(errors.confirmPassword)}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            {/* API Error Message */}
            {apiError && (
              <p className="text-red-500 text-sm text-center">{apiError}</p>
            )}

            {/* Success Message */}
            {success && (
              <p className="text-green-500 text-sm text-center">{success}</p>
            )}

            {/* Submit Button - Gradient */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:from-sky-600 hover:via-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {isLoading
                ? "Loading..."
                : activeTab === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Auth;
