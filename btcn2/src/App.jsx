import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
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
            {/* Thêm các route khác ở đây */}
            {/* <Route path="movie/:id" element={<MovieDetail />} /> */}
            {/* <Route path="search" element={<Search />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
