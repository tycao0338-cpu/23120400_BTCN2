import { useState, useEffect } from "react";
import { HeroCarousel } from "./HeroCarousel";

// Mock data - Top 5 phim doanh thu cao nhất (sẽ thay bằng API sau)
const MOCK_TOP_REVENUE_MOVIES = [
];

/**
 * Main - Component chính chứa các thông tin movie dựa vào trạng thái của trang
 */
export function Main() {
    // State để quản lý trạng thái trang
    const [activeSection, setActiveSection] = useState("home");
    const [topRevenueMovies, setTopRevenueMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch top revenue movies (sử dụng mock data hiện tại)
    useEffect(() => {
        // Simulate API call
        const fetchTopRevenue = async () => {
            setIsLoading(true);
            // TODO: Replace with actual API call
            // const data = await apiRequest("/movies/top-revenue");
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
            setTopRevenueMovies(MOCK_TOP_REVENUE_MOVIES);
            setIsLoading(false);
        };

        fetchTopRevenue();
    }, []);

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
            {/* Hero Carousel - Top 5 phim doanh thu cao nhất */}
            <HeroCarousel movies={topRevenueMovies} />

            {/* Most Popular Section */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Most Popular</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400"></p>
                </div>
            </div>

            {/* Top Rating Section */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Top Rating</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400"></p>
                </div>
            </div>
        </main>
    );
}

export default Main;

