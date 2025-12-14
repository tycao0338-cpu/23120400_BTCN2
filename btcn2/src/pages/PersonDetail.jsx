import { useNavigate, useParams, Link } from "react-router-dom";

/**
 * PersonDetail - Trang chi tiết diễn viên/đạo diễn
 * - Profile Section: Avatar, Name, Birthday, Biography
 * - Known For Section: Grid layout với MovieCard
 * - Responsive layout (stack on mobile)
 * Located in: src/pages/ (theo README structure)
 */

// Dummy data for UI testing
const DUMMY_PERSON = {
    id: "nm0000122",
    name: "Charles Chaplin",
    birthday: "April 16, 1889",
    birthplace: "London, England, UK",
    image: null,
    biography: "Sir Charles Spencer Chaplin was an English comic actor, filmmaker, and composer who rose to fame in the era of silent film. He became a worldwide icon through his screen persona, the Tramp, and is considered one of the most important figures in the history of the film industry. His career spanned more than 75 years, from childhood in the Victorian era until a year before his death in 1977, and encompassed both adulation and controversy.",
    known_for_department: "Acting",
};

const DUMMY_MOVIES = [
    { id: "tt0012349", title: "The Kid", release_date: "1921", poster_path: null, rating: 8.3 },
    { id: "tt0013442", title: "The Pilgrim", release_date: "1923", poster_path: null, rating: 7.5 },
    { id: "tt0015864", title: "The Gold Rush", release_date: "1925", poster_path: null, rating: 8.2 },
    { id: "tt0018773", title: "The Circus", release_date: "1928", poster_path: null, rating: 8.1 },
    { id: "tt0027977", title: "Modern Times", release_date: "1936", poster_path: null, rating: 8.5 },
    { id: "tt0032553", title: "The Great Dictator", release_date: "1940", poster_path: null, rating: 8.4 },
];

export function PersonDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    // TODO: Fetch person data from API
    const person = DUMMY_PERSON;
    const movies = DUMMY_MOVIES;

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
                                    onError={(e) => { e.target.style.display = "none"; }}
                                />
                            ) : (
                                <span className="text-gray-400 dark:text-gray-500 text-7xl">👤</span>
                            )}
                        </div>
                    </div>

                    {/* Person Info */}
                    <div className="flex-1 text-center md:text-left">
                        {/* Name */}
                        <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-2">
                            {person.name}
                        </h1>

                        {/* Department */}
                        {person.known_for_department && (
                            <p className="text-sky-600 dark:text-sky-400 text-sm mb-3">
                                {person.known_for_department}
                            </p>
                        )}

                        {/* Birthday & Birthplace */}
                        <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {person.birthday && (
                                <p><span className="font-semibold">Birthday:</span> {person.birthday}</p>
                            )}
                            {person.birthplace && (
                                <p><span className="font-semibold">Birthplace:</span> {person.birthplace}</p>
                            )}
                        </div>

                        {/* Biography */}
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Biography</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                {person.biography || "No biography available."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Known For Section - Grid Layout with MovieCard */}
            <section className="px-4 pb-6">
                <h2 className="text-xl font-bold dark:text-white mb-3">Known For</h2>

                {movies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
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
 * MovieCard - Reusable card for Known For section
 * (có thể import từ components/movie/MovieCard nếu cần)
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
                <h3 className="font-semibold text-sm dark:text-white truncate mb-1">{title}</h3>
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

export default PersonDetail;
