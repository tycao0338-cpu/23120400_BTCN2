/**
 * MovieCard - Component hiển thị card phim
 * Dùng để hiển thị thông tin cơ bản của một phim: Poster, Title, Year
 */

export function MovieCard({ movie, onClick }) {
    // Destructure movie data với default values
    const {
        id,
        title = "Movie Title",
        release_date = "",
        poster_path = null,
        rating = null,
    } = movie || {};

    // Hiển thị năm từ release_date
    const year = release_date ? release_date.slice(0, 4) : "N/A";

    return (
        <div
            onClick={() => onClick?.(id)}
            className="w-48 bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        >
            {/* Poster */}
            <div className="h-64 bg-gray-300 dark:bg-slate-600 flex items-center justify-center overflow-hidden">
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

            {/* Info */}
            <div className="p-3">
                <h3 className="font-semibold text-sm dark:text-white truncate">
                    {title}
                </h3>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{year}</p>
                    {rating && (
                        <span className="text-xs text-yellow-500">★ {rating}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
