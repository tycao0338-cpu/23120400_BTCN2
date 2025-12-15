import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";

/**
 * MovieRow - Carousel phim với hiệu ứng slide mượt
 * - Phim cũ trượt ra, phim mới trượt vào cùng lúc
 * Located in: src/components/movie/ (theo README structure)
 */
export function MovieRow({ title, movies = [], isLoading = false, moviesPerPage = 3 }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const containerRef = useRef(null);

    // Tính toán pagination
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // Xử lý chuyển trang với animation
    const goToPrevious = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTranslateX(100); // Slide from left

        setTimeout(() => {
            setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
            setTranslateX(0);
            setIsAnimating(false);
        }, 300);
    };

    const goToNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTranslateX(-100); // Slide to left

        setTimeout(() => {
            setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
            setTranslateX(0);
            setIsAnimating(false);
        }, 300);
    };

    const goToPage = (page) => {
        if (isAnimating || page === currentPage) return;
        setIsAnimating(true);
        setTranslateX(page > currentPage ? -100 : 100);

        setTimeout(() => {
            setCurrentPage(page);
            setTranslateX(0);
            setIsAnimating(false);
        }, 300);
    };

    // Get current movies
    const startIndex = currentPage * moviesPerPage;
    const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

    return (
        <div className="mx-4 mb-4">
            {/* Header với title */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold dark:text-white">{title}</h2>
            </div>

            {/* Movie cards với navigation arrows */}
            <div className="relative flex items-center overflow-hidden">
                {/* Left Arrow */}
                <button
                    onClick={goToPrevious}
                    disabled={movies.length === 0 || isAnimating}
                    className="absolute left-2 z-20 w-10 h-10 bg-white/90 dark:bg-slate-600/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
                >
                    <ChevronLeft size={24} className="text-gray-600 dark:text-white" />
                </button>

                {/* Movie Cards Container - Carousel */}
                <div
                    ref={containerRef}
                    className="flex gap-4 w-full justify-center min-h-[320px] px-14 transition-all duration-300 ease-out"
                    style={{
                        transform: `translateX(${translateX}%)`,
                        opacity: isAnimating ? 0.3 : 1
                    }}
                >
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: moviesPerPage }).map((_, i) => (
                            <div
                                key={i}
                                className="w-48 h-80 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
                            />
                        ))
                    ) : currentMovies.length > 0 ? (
                        // Hiển thị phim
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
                    disabled={movies.length === 0 || isAnimating}
                    className="absolute right-2 z-20 w-10 h-10 bg-white/90 dark:bg-slate-600/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
                >
                    <ChevronRight size={24} className="text-gray-600 dark:text-white" />
                </button>
            </div>

            {/* Page Dots Indicator */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-3">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index)}
                            disabled={isAnimating}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentPage
                                ? "bg-sky-500 w-4"
                                : "bg-gray-300 dark:bg-slate-600 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MovieRow;
