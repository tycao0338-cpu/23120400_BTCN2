import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

/**
 * useAuth - Custom hook để sử dụng AuthContext
 * Tách riêng để tránh Fast Refresh warning
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default useAuth;
