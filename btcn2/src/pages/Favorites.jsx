import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserFavorites, removeFromFavorites, getMovieDetails } from "../services/api";
import { MovieCard } from "../components/movie/MovieCard";
import { Heart, HeartCrack, ChevronLeft, ChevronRight, Film } from "lucide-react";

/**
 * Favorites - Trang hiển thị danh sách phim yêu thích
 * - Responsive Grid layout (reusing SearchPage style)
 * - Empty state với Find Movies button
 * - Remove favorite function với optimistic UI update
 * - Private route (chỉ cho user đã login)
 * Located in: src/pages/ (theo README structure)
 */

export function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(favorites.length / itemsPerPage);
    const paginatedFavorites = favorites.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fetch favorites on mount
    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            try {
                // 1. Get list of favorite movie IDs
                const favoriteIds = await getUserFavorites();

                // 2. Fetch full movie details for each favorite
                if (Array.isArray(favoriteIds) && favoriteIds.length > 0) {
                    const moviePromises = favoriteIds.map(async (item) => {
                        try {
                            // item có thể là object {id, ...} hoặc chỉ là string id
                            const movieId = item.id || item.movie_id || item;
                            const movieData = await getMovieDetails(movieId);
                            return movieData;
                        } catch (err) {
                            console.error("Error fetching movie:", err);
                            return null;
                        }
                    });

                    const movies = await Promise.all(moviePromises);
                    // Filter out null values (failed fetches)
                    setFavorites(movies.filter(m => m !== null));
                } else {
                    setFavorites([]);
                }
            } catch (err) {
                console.error("Error fetching favorites:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    // Handle remove favorite
    const handleRemoveFavorite = async (movieId) => {
        if (removingId) return; // Prevent multiple clicks

        setRemovingId(movieId);
        try {
            await removeFromFavorites(movieId);
            // Optimistic UI update - remove from local state immediately
            setFavorites((prev) => prev.filter((m) => m.id !== movieId));
        } catch (err) {
            console.error("Error removing favorite:", err);
            alert(err.message || "Failed to remove from favorites");
        } finally {
            setRemovingId(null);
        }
    };

    // Pagination handlers
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
            {/* Header */}
            <h1 className="text-2xl font-bold dark:text-white mb-6 flex items-center gap-2">
                <Heart size={24} className="text-red-500" /> My Favorite Movies
            </h1>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Movies Section with Arrows */}
            {!isLoading && favorites.length > 0 && (
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="absolute left-50 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={20} className="text-gray-600 dark:text-white" />
                    </button>

                    {/* Movie Cards */}
                    <div className="flex gap-4 justify-center px-14 min-h-[320px]">
                        {paginatedFavorites.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onRemove={handleRemoveFavorite}
                                isRemoving={removingId === movie.id}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="absolute right-50 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-slate-600 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight size={20} className="text-gray-600 dark:text-white" />
                    </button>

                    {/* Page Dots Indicator */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index + 1)}
                                    className={`w-2 h-2 rounded-full transition-all ${index + 1 === currentPage
                                        ? "bg-sky-500 w-4"
                                        : "bg-gray-300 dark:bg-slate-600 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to page ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && favorites.length === 0 && (
                <div className="text-center py-16">
                    <HeartCrack size={64} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        You haven't added any favorites yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Start exploring and add movies to your favorites!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        <Film size={20} /> Find Movies
                    </Link>
                </div>
            )}
        </main>
    );
}

export default Favorites;

