/**
 * MovieCard - Component hiển thị card phim
 * Chỉ hiển thị Poster (tạm thời bỏ title, year, rating)
 */

export function MovieCard({ movie, onClick }) {
    // Destructure movie data với default values
    const {
        id,
        title = "Movie",
        poster_path = null,
    } = movie || {};

    return (
        <div
            onClick={() => onClick?.(id)}
            className="w-48 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
        >
            {/* Poster Only */}
            <div className="h-72 bg-gray-300 dark:bg-slate-600 flex items-center justify-center overflow-hidden">
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
                    className="text-gray-500 dark:text-gray-400"
                    style={{ display: poster_path ? "none" : "flex" }}
                >
                    Poster
                </span>
            </div>
        </div>
    );
}

export default MovieCard;
