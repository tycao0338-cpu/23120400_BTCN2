import { useState, useEffect } from "react";

/**
 * HeroCarousel - Hiển thị 5 phim có doanh thu cao nhất
 * Chỉ hiện 1 phim tại một thời điểm với nút điều hướng
 */
export function HeroCarousel({ movies = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (movies.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [movies.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? movies.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prev) =>
            (prev + 1) % movies.length
        );
    };

    // Placeholder khi chưa có data
    if (movies.length === 0) {
        return (
            <div className="relative h-80 m-4 rounded-lg bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Loading top movies...</p>
            </div>
        );
    }

    const currentMovie = movies[currentIndex];

    return (
        <div className="relative h-80 m-4 rounded-lg overflow-hidden group">
            {/* Movie Poster as Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                    backgroundImage: `url(${currentMovie.poster_path || "/placeholder.jpg"})`
                }}
            >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* Movie Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">
                    {currentMovie.title} ({currentMovie.release_date || "N/A"})
                </h2>
                <p className="text-sm text-gray-300">
                    {currentMovie.genres?.length > 0
                        ? currentMovie.genres.join(", ")
                        : "Action, Adventure"}
                </p>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous movie"
            >
                <span className="text-white text-2xl">‹</span>
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next movie"
            >
                <span className="text-white text-2xl">›</span>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                            ? "bg-white w-4"
                            : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeroCarousel;
