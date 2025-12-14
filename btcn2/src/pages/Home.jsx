import { useState, useEffect } from "react";
import { HeroSlider } from "../components/movie/HeroSlider";
import { MovieRow } from "../components/movie/MovieRow";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { getMostPopular, getTopRated } from "../services/api";

/**
 * Home - Trang chủ hiển thị thông tin phim
 * Located in: src/pages/ (theo README structure)
 * 
 * Logic fetch API được đặt ở đây, UI components được tách riêng.
 * Sử dụng Promise.all để chờ tất cả API calls hoàn thành.
 */
export function Home() {
    const [heroMovies, setHeroMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);

            try {
                // Fetch ALL data in parallel using Promise.all
                const [hero, popular, topRated] = await Promise.all([
                    getMostPopular(1, 5),      // Hero Slider - top 5
                    getMostPopular(1, 15),     // Most Popular - 15 phim
                    getTopRated("IMDB_TOP_50", 1, 15)  // Top Rating - 15 phim
                ]);

                setHeroMovies(hero);
                setPopularMovies(popular);
                setTopRatedMovies(topRated);
            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                // Set loading to false ONLY after ALL API calls finished
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // Show LoadingSpinner while loading
    if (loading) {
        return (
            <main className="flex-1 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
                <LoadingSpinner message="Loading movies..." />
            </main>
        );
    }

    // Show content after loading
    return (
        <main className="flex-1 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
            {/* Hero Slider - Top 5 phim */}
            <HeroSlider movies={heroMovies} />

            {/* Content Section with padding */}
            <div className="py-6 space-y-8">
                {/* Most Popular - 15 phim với pagination 3/trang */}
                <MovieRow
                    title=" Most Popular"
                    movies={popularMovies}
                    moviesPerPage={3}
                />

                {/* Top Rating - 15 phim IMDB TOP 50 với pagination 3/trang */}
                <MovieRow
                    title=" Top Rating"
                    movies={topRatedMovies}
                    moviesPerPage={3}
                />
            </div>
        </main>
    );
}

export default Home;

