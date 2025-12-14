import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Favorites - Trang hiển thị danh sách phim yêu thích
 * - Responsive Grid layout (reusing SearchPage style)
 * - Empty state với Find Movies button
 * - Private route (chỉ cho user đã login)
 * Located in: src/pages/ (theo README structure)
 */

export function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch favorites on mount
    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            try {
                // TODO: Call API to get user's favorites
                // const data = await getUserFavorites();
                // setFavorites(data);

                // Demo: empty list for now
                setFavorites([]);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, []);

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
                        <MovieCard key={movie.id} movie={movie} />
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
 * MovieCard - Card hiển thị phim trong favorites
 */
function MovieCard({ movie }) {
    const { id, title, rating, release_date, poster_path } = movie;

    return (
        <Link
            to={`/movie/${id}`}
            className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer group"
        >
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
    );
}

export default Favorites;
