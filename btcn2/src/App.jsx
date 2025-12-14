import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import "./App.css";

/**
 * App - Nơi khai báo Routing chính (Routes)
 * theo README structure
 */
function App() {
  return (
    <BrowserRouter>
      <div className="max-w-[1200px] mx-auto w-full">
        <Routes>
          {/* MainLayout với Outlet cho các page con */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            {/* Thêm các route khác ở đây */}
            {/* <Route path="movie/:id" element={<MovieDetail />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
