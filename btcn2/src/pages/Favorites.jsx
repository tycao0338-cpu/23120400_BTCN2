import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getUserFavorites,
  removeFromFavorites,
  getMovieDetails,
} from "../services/api";
import { Pagination } from "../components/common/Pagination";
import { Heart, HeartCrack, Film, Trash2 } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
          setFavorites(movies.filter((m) => m !== null));
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

      // Reset to page 1 if current page becomes empty after removal
      const newTotal = favorites.length - 1;
      const newTotalPages = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
      alert(err.message || "Failed to remove from favorites");
    } finally {
      setRemovingId(null);
    }
  };

  // Pagination
  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFavorites = favorites.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* Movies Grid */}
      {!isLoading && favorites.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {paginatedFavorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRemove={handleRemoveFavorite}
                isRemoving={removingId === movie.id}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={favorites.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            itemLabel="favorites"
          />
        </>
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
            to="/home"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <Film size={20} /> Find Movies
          </Link>
        </div>
      )}
    </main>
  );
}

/**
 * MovieCard - Card hiển thị favorite movie với remove button
 */
function MovieCard({ movie, onRemove, isRemoving }) {
  const { id, title, rating, release_date, poster_path } = movie;

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group relative">
      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(id);
        }}
        disabled={isRemoving}
        className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
        title="Remove from favorites"
      >
        {isRemoving ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>

      <Link to={`/movie/${id}`} className="block">
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
            <span className="text-gray-400 dark:text-gray-500 text-4xl">
              🎬
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm dark:text-white truncate mb-2">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs">
            {rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <span>⭐</span>
                <span className="font-medium">{rating}</span>
              </div>
            )}
            {release_date && (
              <div className="text-gray-500 dark:text-gray-400">
                {release_date}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Favorites;
