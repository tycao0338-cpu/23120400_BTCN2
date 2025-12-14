import { useState } from "react";
import { HeroCarousel } from "../components/movie/HeroSlider";
import { MovieCard } from "../components/movie/MovieCard";
import { useFetch } from "../hooks/useFetch";
import { getMostPopular } from "../services/api";

/**
 * Home - Trang chủ hiển thị thông tin phim
 * Located in: src/pages/ (theo README structure)
 */
export function Home() {
    // State cho pagination của Most Popular (3 phim mỗi trang)
    const [currentPage, setCurrentPage] = useState(0);
    const MOVIES_PER_PAGE = 3;

    // Sử dụng custom hook useFetch - lấy 15 phim phổ biến nhất
    const { data: heroMovies, isLoading: heroLoading } = useFetch(
        () => getMostPopular(1, 5),
        []
    );

    // Lấy 15-30 phim phổ biến cho section Most Popular
    const { data: popularMovies, isLoading: popularLoading } = useFetch(
        () => getMostPopular(1, 15),
        []
    );

    // Tính toán số trang và phim hiển thị
    const movies = popularMovies || [];
    const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
    const startIndex = currentPage * MOVIES_PER_PAGE;
    const currentMovies = movies.slice(startIndex, startIndex + MOVIES_PER_PAGE);

    // Xử lý chuyển trang
    const goToPrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    };

    const goToNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    };

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
            {/* Hero Carousel - Top 5 phim Phổ biến nhất */}
            <HeroCarousel movies={heroMovies || []} isLoading={heroLoading} />

            {/* Most Popular Section - 3 Cards per page với pagination */}
            <div className="mx-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold dark:text-white">Most Popular</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Trang {currentPage + 1} / {totalPages || 1}
                    </span>
                </div>

                <div className="relative flex items-center">
                    {/* Left Arrow */}
                    <button
                        onClick={goToPrevious}
                        disabled={movies.length === 0}
                        className="absolute -left-2 z-10 w-8 h-8 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="text-gray-600 dark:text-white text-lg">‹</span>
                    </button>

                    {/* 3 Movie Cards - Hiển thị phim từ API */}
                    <div className="flex gap-4 w-full justify-center min-h-[320px]">
                        {popularLoading ? (
                            // Loading state
                            <>
                                <div className="w-48 h-80 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                                <div className="w-48 h-80 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                                <div className="w-48 h-80 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                            </>
                        ) : currentMovies.length > 0 ? (
                            // Hiển thị 3 phim của trang hiện tại
                            currentMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        ) : (
                            // Empty state
                            <div className="flex items-center justify-center w-full">
                                <p className="text-gray-500 dark:text-gray-400">No movies found</p>
                            </div>
                        )}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        disabled={movies.length === 0}
                        className="absolute -right-2 z-10 w-8 h-8 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="text-gray-600 dark:text-white text-lg">›</span>
                    </button>
                </div>

                {/* Page Dots Indicator */}
                <div className="flex justify-center gap-2 mt-3">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentPage
                                    ? "bg-sky-500 w-4"
                                    : "bg-gray-300 dark:bg-slate-600 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
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
