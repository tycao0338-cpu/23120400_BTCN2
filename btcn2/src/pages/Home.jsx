import { HeroSlider } from "../components/movie/HeroSlider";
import { MovieRow } from "../components/movie/MovieRow";
import { useFetch } from "../hooks/useFetch";
import { getMostPopular } from "../services/api";

/**
 * Home - Trang chủ hiển thị thông tin phim
 * Located in: src/pages/ (theo README structure)
 * 
 * Logic fetch API được đặt ở đây, UI components được tách riêng.
 */
export function Home() {
    // Fetch phim cho Hero Slider (top 5)
    const { data: heroMovies, isLoading: heroLoading } = useFetch(
        () => getMostPopular(1, 5),
        []
    );

    // Fetch phim cho Most Popular section (15 phim, 3/trang)
    const { data: popularMovies, isLoading: popularLoading } = useFetch(
        () => getMostPopular(1, 15),
        []
    );

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
            {/* Hero Slider - Top 5 phim */}
            <HeroSlider movies={heroMovies || []} isLoading={heroLoading} />

            {/* Most Popular - 15 phim với pagination 3/trang */}
            <MovieRow
                title="Most Popular"
                movies={popularMovies || []}
                isLoading={popularLoading}
                moviesPerPage={3}
            />

            {/* Top Rating Section - Placeholder */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Top Rating</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400"></p>
                </div>
            </div>
        </main>
    );
}

export default Home;
