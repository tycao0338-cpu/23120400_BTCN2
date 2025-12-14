import { useNavigate, useParams } from "react-router-dom";

/**
 * MovieDetail - Trang chi tiết phim
 * - Hero Section: Poster + Info (Title, Date, Director, Genres, Overview)
 * - Cast Section: Horizontal scrollable list
 * - Reviews Section: Vertical list
 * - Back button
 * Located in: src/pages/ (theo README structure)
 */

// Dummy data for UI testing
const DUMMY_MOVIE = {
    id: "tt0468569",
    title: "The Dark Knight",
    release_date: "2008",
    director: "Christopher Nolan",
    genres: ["Action", "Crime", "Drama"],
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: null,
    rating: 9.0,
    runtime: 152,
};

const DUMMY_CAST = [
    { id: 1, name: "Christian Bale", character: "Bruce Wayne", image: null },
    { id: 2, name: "Heath Ledger", character: "Joker", image: null },
    { id: 3, name: "Aaron Eckhart", character: "Harvey Dent", image: null },
    { id: 4, name: "Michael Caine", character: "Alfred", image: null },
    { id: 5, name: "Gary Oldman", character: "Gordon", image: null },
    { id: 6, name: "Morgan Freeman", character: "Lucius Fox", image: null },
];

const DUMMY_REVIEWS = [
    { id: 1, author: "MovieFan123", rating: 10, content: "One of the best superhero movies ever made. Heath Ledger's performance is legendary." },
    { id: 2, author: "CriticJoe", rating: 9, content: "Christopher Nolan delivers a masterpiece. The Dark Knight transcends the comic book genre." },
    { id: 3, author: "FilmBuff", rating: 8, content: "Great movie with excellent performances. The pacing is perfect throughout." },
];

export function MovieDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    // TODO: Fetch movie data from API using id
    const movie = DUMMY_MOVIE;
    const cast = DUMMY_CAST;
    const reviews = DUMMY_REVIEWS;

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
                                />
                            ) : (
                                <span className="text-gray-400 dark:text-gray-500 text-6xl">🎬</span>
                            )}
                        </div>
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1">
                        {/* Title & Rating */}
                        <div className="flex items-start justify-between mb-3">
                            <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
                                {movie.title}
                            </h1>
                            {movie.rating && (
                                <div className="flex items-center gap-1 text-yellow-500 text-lg">
                                    <span>⭐</span>
                                    <span className="font-bold">{movie.rating}</span>
                                </div>
                            )}
                        </div>

                        {/* Release Date & Runtime */}
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-3">
                            <span>{movie.release_date}</span>
                            {movie.runtime && <span>• {movie.runtime} min</span>}
                        </div>

                        {/* Director */}
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                            <span className="font-semibold">Director:</span> {movie.director}
                        </p>

                        {/* Genres Badges */}
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

                        {/* Overview */}
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Overview</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cast Section - Horizontal Scroll */}
            <section className="px-4 pb-6">
                <h2 className="text-xl font-bold dark:text-white mb-3">Cast</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {cast.map((actor) => (
                        <div
                            key={actor.id}
                            className="flex-shrink-0 w-24 text-center"
                        >
                            {/* Actor Avatar */}
                            <div className="w-20 h-20 mx-auto bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center overflow-hidden mb-2">
                                {actor.image ? (
                                    <img
                                        src={actor.image}
                                        alt={actor.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-500 text-2xl">👤</span>
                                )}
                            </div>
                            {/* Actor Name */}
                            <p className="text-sm font-medium dark:text-white truncate">{actor.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews Section - Vertical List */}
            <section className="px-4 pb-6">
                <h2 className="text-xl font-bold dark:text-white mb-3">Reviews</h2>
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md"
                        >
                            {/* Review Header */}
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold dark:text-white">{review.author}</span>
                                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                    <span>⭐</span>
                                    <span>{review.rating}/10</span>
                                </div>
                            </div>
                            {/* Review Content */}
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {review.content}
                            </p>
                        </div>
                    ))}

                    {reviews.length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            No reviews yet
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default MovieDetail;
