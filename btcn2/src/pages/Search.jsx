import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Search - Trang tìm kiếm phim
 * - Search input bar at top
 * - Responsive grid layout for results
 * Located in: src/pages/ (theo README structure)
 */

// Dummy data for testing UI (10 movies)
const DUMMY_MOVIES = [
    { id: "tt0111161", title: "The Shawshank Redemption", rating: 9.3, duration: 142, poster_path: null },
    { id: "tt0068646", title: "The Godfather", rating: 9.2, duration: 175, poster_path: null },
    { id: "tt0468569", title: "The Dark Knight", rating: 9.0, duration: 152, poster_path: null },
    { id: "tt0071562", title: "The Godfather Part II", rating: 9.0, duration: 202, poster_path: null },
    { id: "tt0050083", title: "12 Angry Men", rating: 9.0, duration: 96, poster_path: null },
    { id: "tt0108052", title: "Schindler's List", rating: 9.0, duration: 195, poster_path: null },
    { id: "tt0167260", title: "The Lord of the Rings", rating: 9.0, duration: 201, poster_path: null },
    { id: "tt0110912", title: "Pulp Fiction", rating: 8.9, duration: 154, poster_path: null },
    { id: "tt0120737", title: "The Fellowship of the Ring", rating: 8.8, duration: 178, poster_path: null },
    { id: "tt0109830", title: "Forrest Gump", rating: 8.8, duration: 142, poster_path: null },
];

export function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState(DUMMY_MOVIES);

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Integrate with API
        console.log("Searching for:", searchQuery);
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors"
                    >
                        <span className="text-white text-xl">🔍</span>
                    </button>
                </div>
            </form>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Found {results.length} results
                </p>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((movie) => (
                    <SearchResultCard key={movie.id} movie={movie} />
                ))}
            </div>
        </main>
    );
}

/**
 * SearchResultCard - Card hiển thị trong kết quả tìm kiếm
 * Hiển thị: Poster, Title, Rating, Duration
 */
function SearchResultCard({ movie }) {
    const { id, title, rating, duration, poster_path } = movie;

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

                {/* Rating & Duration */}
                <div className="flex items-center justify-between text-xs">
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-500">
                        <span>⭐</span>
                        <span className="font-medium">{rating}</span>
                    </div>

                    {/* Duration */}
                    <div className="text-gray-500 dark:text-gray-400">
                        {duration} min
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Search;
