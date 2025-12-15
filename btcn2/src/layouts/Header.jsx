import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/api";
import { Moon, Sun, Heart, LogOut, User } from "lucide-react";

/**
 * Header - Layout component containing top bar and navigation
 * - Guest: Login/Register buttons
 * - User: Avatar dropdown với My Profile, My Favorites, Logout
 * - Sử dụng AuthContext để quản lý user state
 * Located in: src/layouts/ (theo README structure)
 */
export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto hide toast after 3s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Logout handler
  const handleLogout = async () => {
    try {
      // Call logout API
      await logoutUser();
    } catch (err) {
      console.error("Logout API error:", err);
    }

    // Use context logout (clears state + localStorage)
    logout();
    setDropdownOpen(false);

    // Show toast notification
    setToast({ message: "Logged out successfully", type: "success" });

    // Navigate to home
    navigate("/");
  };


  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Header Bar - Gradient Premium - FIXED */}
      <div className="flex items-center h-14 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
        {/* MSSV Logo */}
        <div className="px-4 h-full flex items-center border-r border-white/20">
          <span className="text-white/90 font-mono text-sm font-medium tracking-wide">
            &lt;23120400&gt;
          </span>
        </div>

        {/* Title - clickable to Home */}
        <Link
          to="/home"
          className="flex-1 h-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
        >
          <h1 className="text-white font-bold text-xl tracking-wide drop-shadow-sm">
            Movies Info
          </h1>
        </Link>

        {/* Theme Toggle & User Section */}
        <div className="px-4 h-full flex items-center gap-3 border-l border-white/20">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-10 h-5 rounded-full transition-colors ${
              isDark ? "bg-slate-600" : "bg-white/30"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                isDark ? "left-[22px]" : "left-0.5"
              }`}
            ></span>
          </button>
          <span className="text-white">
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </span>

          {/* User Section */}
          {user ? (
            /* Logged In - Avatar Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-700 flex items-center justify-center text-white font-medium text-sm transition-colors"
              >
                <User size={18} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600 py-1 z-50">
                  {/* User Info */}
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-600">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Items */}

                  <Link
                    to="/favorites"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <Heart size={16} /> My Favorites
                  </Link>

                  {/* Separator */}
                  <div className="border-t border-gray-200 dark:border-slate-600 my-1"></div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest - Login/Register Buttons */
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="px-3 py-1 text-sm text-white hover:text-sky-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="px-3 py-1 text-sm bg-white text-sky-600 rounded hover:bg-sky-50 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{toast.type === "success" ? "✅" : "❌"}</span>
              <span>{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
