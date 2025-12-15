import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getMovieDetails,
  getMovieReviews,
  addToFavorites,
} from "../services/api";
import { ReviewItem } from "../components/review/ReviewItem";
import { Pagination } from "../components/common/Pagination";
import { ArrowLeft, Heart, Star, Film, User, Loader } from "lucide-react";

/**
 * MovieDetail - Trang chi tiết phim
 * - Fetch data từ API sử dụng useEffect
 * - Hero Section: Poster + Info (Title, Date, Director, Genres, Overview)
 * - Cast Section: Horizontal scrollable list
 * - Reviews Section: Vertical list
 * - Back button
 * Located in: src/pages/ (theo README structure)
 */

export function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Reviews pagination state
  const [reviews, setReviews] = useState([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsPagination, setReviewsPagination] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Handle toggle favorite
  const handleToggleFavorite = async () => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to auth if not logged in
      navigate("/auth");
      return;
    }

    setFavoriteLoading(true);
    try {
      await addToFavorites(id);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert(err.message || "Failed to update favorites");
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Fetch movie details từ API
  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Fetch reviews với pagination
  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      setReviewsLoading(true);

      try {
        const data = await getMovieReviews(id, reviewsPage, 5);
        setReviews(data.reviews);
        setReviewsPagination(data.pagination);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [id, reviewsPage]);

  // Reviews pagination handler
  const goToReviewsPage = (page) => {
    if (page >= 1 && page <= (reviewsPagination?.total_pages || 1)) {
      setReviewsPage(page);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Loading movie details...
          </p>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Error loading movie
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </main>
    );
  }

  // No movie found
  if (!movie) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </button>
        <div className="text-center py-16">
          <Film size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Movie not found
          </h3>
        </div>
      </main>
    );
  }

  // Lấy director từ directors array
  const director = movie.directors?.[0]?.name || "Unknown";

  return (
    <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section - Poster + Info */}
      <section className="px-4 pb-6">
        <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md">
          {/* Poster */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="aspect-[2/3] bg-gray-300 dark:bg-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <Film size={64} className="text-gray-400 dark:text-gray-500" />
              )}
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            {/* Title, Favorite & Rating */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
                  {movie.title}
                </h1>
                {/* Favorite Button */}
                <button
                  onClick={handleToggleFavorite}
                  disabled={favoriteLoading}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  {favoriteLoading ? (
                    <Loader size={24} className="animate-spin text-gray-500" />
                  ) : isFavorite ? (
                    <Heart size={24} className="text-red-500 fill-red-500" />
                  ) : (
                    <Heart size={24} className="text-gray-400" />
                  )}
                </button>
              </div>
              {movie.rating && (
                <div className="flex items-center gap-1 text-yellow-500 text-lg">
                  <Star size={20} className="fill-yellow-500" />
                  <span className="font-bold">{movie.rating}</span>
                </div>
              )}
            </div>

            {/* Release Date & Runtime */}
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-3">
              <span>{movie.release_date}</span>
              {movie.runtime && <span>• {movie.runtime}</span>}
            </div>

            {/* Director */}
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <span className="font-semibold">Director:</span> {director}
            </p>

            {/* Genres Badges */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Overview
              </h3>
              <div
                className="text-gray-600 dark:text-gray-400 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    movie.overview ||
                    movie.short_description ||
                    "No overview available.",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cast Section - Horizontal Scroll */}
      {movie.actors?.length > 0 && (
        <section className="px-4 pb-6">
          <h2 className="text-xl font-bold dark:text-white mb-3">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {movie.actors.map((actor) => (
              <Link
                to={`/person/${actor.id}`}
                key={actor.id}
                className="flex-shrink-0 w-24 text-center cursor-pointer group"
              >
                {/* Actor Avatar */}
                <div className="w-20 h-20 mx-auto bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center overflow-hidden mb-2 group-hover:ring-2 group-hover:ring-sky-500 transition-all">
                  {actor.image ? (
                    <img
                      src={actor.image}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <User
                      size={24}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  )}
                </div>
                {/* Actor Name */}
                <p className="text-sm font-medium dark:text-white truncate group-hover:text-sky-500 transition-colors">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {actor.character}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section - Vertical List with Pagination */}
      <section className="px-4 pb-6">
        <h2 className="text-xl font-bold dark:text-white mb-3">
          Reviews{" "}
          {reviewsPagination?.total_items > 0 &&
            `(${reviewsPagination.total_items})`}
        </h2>

        {/* Reviews Loading */}
        {reviewsLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Reviews List */}
        {!reviewsLoading && (
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewItem
                  key={review.id}
                  username={review.author}
                  rating={review.rating}
                  title={review.title}
                  content={review.content}
                  date={review.date}
                  isSpoiler={review.warning_spoilers}
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No reviews yet
              </p>
            )}
          </div>
        )}

        {/* Reviews Pagination */}
        <Pagination
          currentPage={reviewsPage}
          totalPages={reviewsPagination?.total_pages || 1}
          totalItems={reviewsPagination?.total_items || 0}
          itemsPerPage={5}
          onPageChange={goToReviewsPage}
          itemLabel="reviews"
        />
      </section>
    </main>
  );
}

export default MovieDetail;
