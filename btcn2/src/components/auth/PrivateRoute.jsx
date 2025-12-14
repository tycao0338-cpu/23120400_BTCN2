import { Navigate, Outlet } from "react-router-dom";

/**
 * Check if user is authenticated by checking localStorage token
 */
const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
};

/**
 * PrivateRoute - Bảo vệ các route cần đăng nhập
 * - Token exists: Render child components (Outlet)
 * - Token NOT exists: Redirect to /auth
 */
export function PrivateRoute() {
    if (!isAuthenticated()) {
        return <Navigate to="/auth" replace />;
    }
    return <Outlet />;
}

/**
 * GuestRoute - Chỉ cho phép guest (chưa đăng nhập)
 * - Token exists: Redirect to / (Home)
 * - Token NOT exists: Render child components (Outlet)
 * Dùng để ngăn user đã login truy cập trang Auth
 */
export function GuestRoute() {
    if (isAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export default PrivateRoute;
