import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserFavorites, removeFromFavorites } from "../services/api";
import { MovieCard } from "../components/movie/MovieCard";

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
                const data = await getUserFavorites();
                setFavorites(data);
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
            <h1 className="text-2xl font-bold dark:text-white mb-6">
                ❤️ My Favorite Movies
            </h1>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center py-16">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Movies Grid */}
            {!isLoading && favorites.length > 0 && (
                <>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {paginatedFavorites.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onRemove={handleRemoveFavorite}
                                isRemoving={removingId === movie.id}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 dark:disabled:bg-slate-600 text-white disabled:text-gray-500 rounded-lg transition-colors disabled:cursor-not-allowed"
                            >
                                ← Previous
                            </button>
                            <span className="text-gray-600 dark:text-gray-400">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 dark:disabled:bg-slate-600 text-white disabled:text-gray-500 rounded-lg transition-colors disabled:cursor-not-allowed"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Empty State */}
            {!isLoading && favorites.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">💔</div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        You haven't added any favorites yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Start exploring and add movies to your favorites!
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
                    >
                        🎬 Find Movies
                    </Link>
                </div>
            )}
        </main>
    );
}

export default Favorites;

