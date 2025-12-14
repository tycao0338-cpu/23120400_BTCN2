import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * MainLayout - Layout chính với Header, Footer và Outlet cho routing
 * Located in: src/layouts/ (theo README structure)
 */
export function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MainLayout;
