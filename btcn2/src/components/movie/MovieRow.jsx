import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";

/**
 * MovieRow - List phim nằm ngang với pagination
 * Located in: src/components/movie/ (theo README structure)
 * 
 * @param {string} title - Tiêu đề section
 * @param {Array} movies - Danh sách phim
 * @param {boolean} isLoading - Trạng thái loading
 * @param {number} moviesPerPage - Số phim mỗi trang (default: 3)
 */
export function MovieRow({ title, movies = [], isLoading = false, moviesPerPage = 3 }) {
    const [currentPage, setCurrentPage] = useState(0);

    // Tính toán pagination
    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const startIndex = currentPage * moviesPerPage;
    const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

    // Xử lý chuyển trang
    const goToPrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    };

    const goToNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    };

    return (
        <div className="mx-4 mb-4">
            {/* Header với title */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold dark:text-white">{title}</h2>
            </div>

            {/* Movie cards với navigation arrows */}
            <div className="relative flex items-center">
                {/* Left Arrow */}
                <button
                    onClick={goToPrevious}
                    disabled={movies.length === 0}
                    className="absolute left-50 z-10 w-8 h-8 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={20} className="text-gray-600 dark:text-white" />
                </button>

                {/* Movie Cards Container */}
                <div className="flex gap-4 w-full justify-center min-h-[320px]">
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
                    disabled={movies.length === 0}
                    className="absolute right-50 z-10 w-8 h-8 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight size={20} className="text-gray-600 dark:text-white" />
                </button>
            </div>

            {/* Page Dots Indicator */}
            {totalPages > 1 && (
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
            )}
        </div>
    );
}

export default MovieRow;
