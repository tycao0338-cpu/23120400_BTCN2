import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser, loginUser } from "../services/api";
import { loginSchema, registerSchema } from "../lib/schemas";

/**
 * Auth - Trang đăng nhập và đăng ký
 * - 2 tabs: Login / Register
 * - Sử dụng react-hook-form với Zod validation
 * Located in: src/pages/ (theo README structure)
 */

export function Auth() {
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
                // Lưu token vào localStorage
                if (result.token) {
                    localStorage.setItem("authToken", result.token);
                }
                if (result.user) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                }
                setSuccess("Login successful! Redirecting...");
                // Force reload to update Header user state
                setTimeout(() => {
                    window.location.href = "/";
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
        `w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 ${hasError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-slate-500"
        }`;

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to Home */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
                >
                    <span>←</span>
                    <span>Back to Home</span>
                </Link>

                {/* Auth Card */}
                <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg overflow-hidden">
                    {/* Tabs */}
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => switchTab("login")}
                            className={`flex-1 py-3 text-center font-medium transition-colors ${activeTab === "login"
                                    ? "bg-sky-500 text-white"
                                    : "bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-500"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => switchTab("register")}
                            className={`flex-1 py-3 text-center font-medium transition-colors ${activeTab === "register"
                                    ? "bg-sky-500 text-white"
                                    : "bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-500"
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
                                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
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
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-medium rounded-lg transition-colors"
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
