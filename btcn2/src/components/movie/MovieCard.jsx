import { Link } from "react-router-dom";

/**
 * MovieCard - Component hiển thị card phim với hover effect
 * - Wrapped với Link để navigate đến /movie/:id
 * - Scale up khi hover
 * - Z-index cao hơn (nổi lên trên)
 * - Hiển thị info overlay (title + year)
 * - Smooth transition
 */

export function MovieCard({ movie }) {
    // Destructure movie data với default values
    const {
        id,
        title = "Movie Title",
        release_date = "",
        poster_path = null,
    } = movie || {};

    // Lấy năm từ release_date
    const year = release_date ? release_date.slice(0, 4) : "";

    return (
        <Link
            to={`/movie/${id}`}
            className="relative w-48 rounded-lg overflow-visible cursor-pointer group block"
        >
            {/* Card Container với hover effects */}
            <div className="relative h-72 rounded-lg overflow-hidden transition-all duration-300 ease-out group-hover:scale-125 group-hover:z-50 group-hover:shadow-2xl">
                {/* Poster Image */}
                <div className="w-full h-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center">
                    {poster_path ? (
                        <img
                            src={poster_path}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                            }}
                        />
                    ) : null}
                    <span
                        className="text-gray-500 dark:text-gray-400 absolute"
                        style={{ display: poster_path ? "none" : "flex" }}
                    >
                        Poster
                    </span>
                </div>

                {/* Info Overlay - Hiển thị khi hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <h3 className="text-white font-semibold text-sm truncate">
                        {title}
                    </h3>
                    {year && (
                        <p className="text-gray-300 text-xs mt-0.5">({year})</p>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
