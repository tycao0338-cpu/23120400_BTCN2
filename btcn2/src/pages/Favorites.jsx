import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getUserFavorites,
  removeFromFavorites,
  getMovieDetails,
} from "../services/api";
import { MovieRow } from "../components/movie/MovieRow";
import { Heart, HeartCrack, Film } from "lucide-react";

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
      <h1 className="text-2xl font-bold dark:text-white mb-6 flex items-center gap-2">
        <Heart size={24} className="text-red-500" /> My Favorite Movies
      </h1>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Movies Section - sử dụng MovieRow giống Home */}
      {!isLoading && favorites.length > 0 && (
        <MovieRow
          movies={favorites}
          onRemove={handleRemoveFavorite}
          removingId={removingId}
        />
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

export default Favorites;
