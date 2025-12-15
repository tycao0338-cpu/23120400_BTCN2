import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPersonDetails } from "../services/api";
import { BackButton } from "../components/common/BackButton";
import { Pagination } from "../components/common/Pagination";

/**
 * PersonDetail - Trang chi tiết diễn viên/đạo diễn
 * - Fetch data từ API sử dụng useEffect
 * - Profile Section: Avatar, Name, Birthday, Biography
 * - Known For Section: Grid layout với MovieCard
 * - Responsive layout (stack on mobile)
 * Located in: src/pages/ (theo README structure)
 */

export function PersonDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State
  const [person, setPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state for Known For section
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch person details từ API
  useEffect(() => {
    if (!id) return;

    const fetchPerson = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPersonDetails(id);
        setPerson(data);
      } catch (err) {
        console.error("Error fetching person:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  // Loading State
  if (isLoading) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Loading person details...
          </p>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <BackButton className="mb-4" />
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Error loading person
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </main>
    );
  }

  // No person found
  if (!person) {
    return (
      <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors p-4">
        <BackButton className="mb-4" />
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Person not found
          </h3>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
      {/* Back Button */}
      <div className="p-4">
        <BackButton />
      </div>

      {/* Profile Section */}
      <section className="px-4 pb-6">
        <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md">
          {/* Profile Image - Large Avatar */}
          <div className="w-full md:w-64 flex-shrink-0 flex justify-center md:justify-start">
            <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center overflow-hidden">
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-7xl">
                  👤
                </span>
              )}
            </div>
          </div>

          {/* Person Info */}
          <div className="flex-1 text-center md:text-left">
            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-2">
              {person.name}
            </h1>

            {/* Role/Department */}
            {person.role && (
              <p className="text-sky-600 dark:text-sky-400 text-sm mb-3">
                {person.role}
              </p>
            )}

            {/* Birth/Death Date & Height */}
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 space-y-1">
              {person.birth_date && (
                <p>
                  <span className="font-semibold">Born:</span>{" "}
                  {person.birth_date}
                </p>
              )}
              {person.death_date && (
                <p>
                  <span className="font-semibold">Died:</span>{" "}
                  {person.death_date}
                </p>
              )}
              {person.height && (
                <p>
                  <span className="font-semibold">Height:</span> {person.height}
                </p>
              )}
            </div>

            {/* Biography/Summary */}
            {person.summary && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Biography
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {person.summary}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Known For Section - Grid Layout with MovieCard */}
      <section className="px-4 pb-6">
        <h2 className="text-xl font-bold dark:text-white mb-3">Known For</h2>

        {person.known_for?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {(() => {
                // Calculate pagination
                const totalItems = person.known_for.length;
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentMovies = person.known_for.slice(
                  startIndex,
                  endIndex
                );

                return currentMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ));
              })()}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(person.known_for.length / itemsPerPage)}
              totalItems={person.known_for.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              itemLabel="movies"
            />
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No movies found
          </p>
        )}
      </section>
    </main>
  );
}

/**
 * MovieCard - Card for Known For section
 * Click navigates to movie detail page
 */
function MovieCard({ movie }) {
  const { id, title, rating, release_date, poster_path, character } = movie;

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
        <h3 className="font-semibold text-sm dark:text-white truncate mb-1">
          {title}
        </h3>
        {character && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
            as {character}
          </p>
        )}
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

export default PersonDetail;
