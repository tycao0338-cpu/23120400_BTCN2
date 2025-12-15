import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { MovieDetail } from "./pages/MovieDetail";
import { PersonDetail } from "./pages/PersonDetail";
import { Auth } from "./pages/Auth";
import { Favorites } from "./pages/Favorites";
import { PrivateRoute, GuestRoute } from "./components/auth/PrivateRoute";
import "./App.css";

/**
 * App - Nơi khai báo Routing chính (Routes)
 * - Public: Home, Search, MovieDetail, PersonDetail
 * - Guest Only: Auth (Login/Register)
 * - Private: Profile, Favorites
 * theo README structure
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="max-w-[1200px] mx-auto w-full">
          <Routes>
            {/* Public Routes - MainLayout với Outlet */}
            <Route path="/" element={<MainLayout />}>
              {/* Redirect / to /home */}
              <Route index element={<Navigate to="/home" replace />} />

              {/* Public - Accessible to everyone */}
              <Route path="home" element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="movie/:id" element={<MovieDetail />} />
              <Route path="person/:id" element={<PersonDetail />} />

              {/* Guest Only Routes - chỉ cho user chưa đăng nhập */}
              <Route element={<GuestRoute />}>
                <Route path="auth" element={<Auth />} />
              </Route>

              {/* Private Routes - cần đăng nhập */}
              <Route element={<PrivateRoute />}>
                <Route path="favorites" element={<Favorites />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
