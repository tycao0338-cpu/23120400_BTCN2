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
            <MovieRow
                title="Top Rating"
                movies={[]}
                isLoading={false}
                moviesPerPage={3}
            />
        </main>
    );
}

export default Home;
