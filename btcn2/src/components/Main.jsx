import { HeroCarousel } from "./HeroCarousel";
import { useFetch } from "../hooks/useFetch";
import { getMostPopular } from "../services/api";

/**
 * Main - Component chính chứa các thông tin movie dựa vào trạng thái của trang
 */
export function Main() {
    // Sử dụng custom hook useFetch theo cấu trúc README
    const { data: mostPopularMovies, isLoading, error } = useFetch(
        () => getMostPopular(1, 5),
        []
    );

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
            {/* Hero Carousel - Top 5 phim Phổ biến nhất */}
            <HeroCarousel movies={mostPopularMovies || []} isLoading={isLoading} />

            {/* Most Popular Section - Placeholder */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Most Popular</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400"></p>
                </div>
            </div>

            {/* Top Rating Section - Placeholder */}
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
