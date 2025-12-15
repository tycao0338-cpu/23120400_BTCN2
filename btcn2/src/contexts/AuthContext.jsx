import { createContext, useState, useEffect } from "react";

/**
 * AuthContext - Quản lý authentication state toàn app
 * Cung cấp: user, login, logout, isAuthenticated
 *
 * Note: useAuth hook được tách ra hooks/useAuth.js để tránh Fast Refresh warning
 */

const AuthContext = createContext(null);

/**
 * AuthProvider - Wrap app để cung cấp auth state
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading khi check initial auth

  // Check localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("authToken");

        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Error initializing auth:", e);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login - Lưu user và token vào state + localStorage
   */
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", token);
  };

  /**
   * Logout - Xóa user và token
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = !!user && !!localStorage.getItem("authToken");

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
