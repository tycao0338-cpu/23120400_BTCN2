import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

/**
 * MainLayout - Layout chính với Header, NavBar, Footer và Outlet cho routing
 * Located in: src/layouts/ (theo README structure)
 */
export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      <Header />
      {/* NavBar - nằm ngoài Header để scroll bình thường */}
      <div className="mt-[5px]">
        <NavBar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
