import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Auth - Trang đăng nhập và đăng ký
 * - 2 tabs: Login / Register
 * - Shared form layout
 * Located in: src/pages/ (theo README structure)
 */

export function Auth() {
    const [activeTab, setActiveTab] = useState("login"); // "login" or "register"

    // Form states
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (activeTab === "register") {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            if (formData.password.length < 6) {
                setError("Password must be at least 6 characters");
                return;
            }
        }

        setIsLoading(true);

        try {
            // TODO: API call for login/register
            console.log(`${activeTab}:`, formData);
            alert(`${activeTab === "login" ? "Login" : "Register"} successful! (Demo)`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Switch tab and reset form
    const switchTab = (tab) => {
        setActiveTab(tab);
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        setError("");
    };

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
                            onClick={() => switchTab("login")}
                            className={`flex-1 py-3 text-center font-medium transition-colors ${activeTab === "login"
                                    ? "bg-sky-500 text-white"
                                    : "bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-500"
                                }`}
                        >
                            Login
                        </button>
                        <button
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
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Username (Register only) */}
                        {activeTab === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    placeholder="Enter username"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Enter email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Enter password"
                            />
                        </div>

                        {/* Confirm Password (Register only) */}
                        {activeTab === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-500 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    placeholder="Confirm password"
                                />
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
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
