import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/api";

/**
 * Search - Trang tìm kiếm phim
 * - Search input bar at top
 * - Responsive grid layout for results
 * - API integration with loading/error states
 * Located in: src/pages/ (theo README structure)
 */

export function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const response = await searchMovies(searchQuery, 1, 20);
            setResults(response.data);
            setPagination(response.pagination);
        } catch (err) {
            console.error("Search error:", err);
            setError(err.message);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for movies..."
                        className="w-full px-5 py-4 pr-14 text-lg rounded-full border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors shadow-md"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
                    >
                        <span className="text-white text-xl">{isLoading ? "⏳" : "🔍"}</span>
                    </button>
                </div>
            </form>

            {/* Error State */}
            {error && (
                <div className="text-center py-8">
                    <p className="text-red-500 dark:text-red-400">Error: {error}</p>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden animate-pulse">
                            <div className="aspect-[2/3] bg-gray-300 dark:bg-slate-600" />
                            <div className="p-3 space-y-2">
                                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded" />
                                <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Results */}
            {!isLoading && !error && hasSearched && (
                <>
                    {/* Results Count */}
                    <div className="mb-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Found {pagination?.total_items || results.length} results
                        </p>
                    </div>

                    {/* No Results */}
                    {results.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🎬</div>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                No movies found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Try searching with different keywords
                            </p>
                        </div>
                    ) : (
                        /* Responsive Grid Layout */
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {results.map((movie) => (
                                <SearchResultCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Initial State - Before searching */}
            {!hasSearched && !isLoading && (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Search for movies
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Enter a movie title to get started
                    </p>
                </div>
            )}
        </main>
    );
}

/**
 * SearchResultCard - Card hiển thị trong kết quả tìm kiếm
 * Hiển thị: Poster, Title, Rating, Year
 */
function SearchResultCard({ movie }) {
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
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-4xl">🎬</span>
                )}
            </div>

            {/* Info */}
            <div className="p-3">
                {/* Title */}
                <h3 className="font-semibold text-sm dark:text-white truncate mb-2">
                    {title}
                </h3>

                {/* Rating & Year */}
                <div className="flex items-center justify-between text-xs">
                    {/* Rating */}
                    {rating && (
                        <div className="flex items-center gap-1 text-yellow-500">
                            <span>⭐</span>
                            <span className="font-medium">{rating}</span>
                        </div>
                    )}

                    {/* Year */}
                    {release_date && (
                        <div className="text-gray-500 dark:text-gray-400">
                            {release_date}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default Search;
