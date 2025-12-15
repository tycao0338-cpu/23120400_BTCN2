import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchMovies, searchByPerson } from "../services/api";
import { Pagination } from "../components/common/Pagination";

/**
 * Search - Trang tìm kiếm phim với phân trang
 * - Đọc query và searchBy từ URL (?q=...&by=...)
 * - Kết quả luôn là movies (Grid layout với MovieCard)
 * - Pagination: Previous/Next buttons
 * Located in: src/pages/ (theo README structure)
 */

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const searchBy = searchParams.get("by") || "title";

  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset page khi query hoặc searchBy thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [query, searchBy]);

  // Fetch search results
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setPagination(null);
      return;
    }

    const doSearch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let response;

        if (searchBy === "title") {
          response = await searchMovies(query, currentPage, 10);
        } else {
          response = await searchByPerson(query, currentPage, 10);
        }

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

    doSearch();
  }, [query, searchBy, currentPage]);

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= (pagination?.total_pages || 1)) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
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
            <div
              key={i}
              className="bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-[2/3] bg-gray-300 dark:bg-slate-600" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded" />
                <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && !error && results.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.total_pages || 1}
            totalItems={pagination?.total_items || 0}
            itemsPerPage={10}
            onPageChange={goToPage}
            itemLabel="results"
          />
        </>
      )}

      {/* No Results */}
      {!isLoading && !error && query && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">
            {searchBy === "person" ? "🎭" : "🎬"}
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No movies found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try searching with different keywords
          </p>
        </div>
      )}

      {/* No Query */}
      {!query && !isLoading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search for movies
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Use the search bar above to find movies
          </p>
        </div>
      )}
    </main>
  );
}

/**
 * MovieCard - Card hiển thị kết quả tìm kiếm
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
  );
}

export default Search;
