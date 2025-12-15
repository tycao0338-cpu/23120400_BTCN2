import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner } from "../common/LoadingSpinner";

/**
 * PrivateRoute - Bảo vệ các route cần đăng nhập
 * - Sử dụng AuthContext để check authentication
 * - Show loading khi đang check initial auth
 * - Redirect to /auth nếu chưa login
 */
export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}

/**
 * GuestRoute - Chỉ cho phép guest (chưa đăng nhập)
 * - Sử dụng AuthContext để check authentication
 * - Redirect to / nếu đã login
 */
export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
