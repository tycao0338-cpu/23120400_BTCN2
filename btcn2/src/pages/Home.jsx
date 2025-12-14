import { HeroCarousel } from "../components/movie/HeroSlider";
import { MovieCard } from "../components/movie/MovieCard";
import { useFetch } from "../hooks/useFetch";
import { getMostPopular } from "../services/api";

/**
 * Home - Trang chủ hiển thị thông tin phim
 * Located in: src/pages/ (theo README structure)
 */
export function Home() {
    // Sử dụng custom hook useFetch theo cấu trúc README
    const { data: mostPopularMovies, isLoading, error } = useFetch(
        () => getMostPopular(1, 5),
        []
    );

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
            {/* Hero Carousel - Top 5 phim Phổ biến nhất */}
            <HeroCarousel movies={mostPopularMovies || []} isLoading={isLoading} />

            {/* Most Popular Section - 3 Cards per page */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Most Popular</h2>
                <div className="relative flex items-center">
                    {/* Left Arrow */}
                    <button className="absolute -left-2 z-10 w-8 h-8 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500">
                        <span className="text-gray-600 dark:text-white">‹</span>
                    </button>

                    {/* 3 Movie Cards - Using MovieCard component */}
                    <div className="flex gap-4 w-full justify-center">
                        <MovieCard movie={{ id: 1, title: "Movie Title 1", release_date: "2024" }} />
                        <MovieCard movie={{ id: 2, title: "Movie Title 2", release_date: "2023" }} />
                        <MovieCard movie={{ id: 3, title: "Movie Title 3", release_date: "2022" }} />
                    </div>

                    {/* Right Arrow */}
                    <button className="absolute -right-2 z-10 w-8 h-8 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500">
                        <span className="text-gray-600 dark:text-white">›</span>
                    </button>
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

export default Home;
