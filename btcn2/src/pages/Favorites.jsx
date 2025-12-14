import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserFavorites, removeFromFavorites } from "../services/api";

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
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {favorites.map((movie) => (
                        <FavoriteCard
                            key={movie.id}
                            movie={movie}
                            onRemove={handleRemoveFavorite}
                            isRemoving={removingId === movie.id}
                        />
                    ))}
                </div>
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

/**
 * FavoriteCard - Card hiển thị phim trong favorites với nút xóa
 */
function FavoriteCard({ movie, onRemove, isRemoving }) {
    const { id, title, rating, release_date, poster_path } = movie;

    const handleRemoveClick = (e) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();
        onRemove(id);
    };

    return (
        <div className="relative bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group">
            {/* Remove Button */}
            <button
                onClick={handleRemoveClick}
                disabled={isRemoving}
                className="absolute top-2 right-2 z-10 p-1.5 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from favorites"
            >
                {isRemoving ? (
                    <span className="text-sm">⏳</span>
                ) : (
                    <span className="text-sm">🗑️</span>
                )}
            </button>

            <Link to={`/movie/${id}`}>
                {/* Poster */}
                <div className="aspect-[2/3] bg-gray-300 dark:bg-slate-600 flex items-center justify-center overflow-hidden">
                    {poster_path ? (
                        <img
                            src={poster_path}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => { e.target.style.display = "none"; }}
                        />
                    ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-4xl">🎬</span>
                    )}
                </div>

                {/* Info */}
                <div className="p-3">
                    <h3 className="font-semibold text-sm dark:text-white truncate mb-2">{title}</h3>
                    <div className="flex items-center justify-between text-xs">
                        {rating && (
                            <div className="flex items-center gap-1 text-yellow-500">
                                <span>⭐</span>
                                <span className="font-medium">{rating}</span>
                            </div>
                        )}
                        {release_date && (
                            <div className="text-gray-500 dark:text-gray-400">{release_date}</div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Favorites;
