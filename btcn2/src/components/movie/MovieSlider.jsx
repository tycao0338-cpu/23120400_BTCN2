import { MovieCard } from "@/components/movie/MovieCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * MovieSlider - Carousel phim sử dụng Shadcn/Embla Carousel
 * - Nhận movies array và render MovieCards
 * - Smooth slide animation khi chuyển trang
 * - Hiển thị 3 phim mỗi lần, slide từng phim
 * 
 * @param {string} title - Tiêu đề section
 * @param {Array} movies - Danh sách phim
 * @param {boolean} isLoading - Trạng thái loading
 */
export function MovieSlider({ title, movies = [], isLoading = false }) {
    return (
        <div className="mx-4 mb-6">
            {/* Header với title */}
            {title && (
                <h2 className="text-xl font-bold dark:text-white mb-4">{title}</h2>
            )}

            {/* Carousel Container */}
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4 py-8 overflow-visible">
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: 6 }).map((_, i) => (
                            <CarouselItem key={i} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
                                <div className="w-48 h-80 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                            </CarouselItem>
                        ))
                    ) : movies.length > 0 ? (
                        // Render movie cards
                        movies.map((movie) => (
                            <CarouselItem
                                key={movie.id}
                                className="pl-4 basis-auto"
                            >
                                <MovieCard movie={movie} />
                            </CarouselItem>
                        ))
                    ) : (
                        // Empty state
                        <CarouselItem className="pl-4 basis-full">
                            <div className="flex items-center justify-center h-80">
                                <p className="text-gray-500 dark:text-gray-400">No movies found</p>
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>

                {/* Navigation Arrows */}
                {movies.length > 3 && (
                    <>
                        <CarouselPrevious className="left-0 bg-white/90 dark:bg-slate-600/90 hover:bg-white dark:hover:bg-slate-500 shadow-lg" />
                        <CarouselNext className="right-0 bg-white/90 dark:bg-slate-600/90 hover:bg-white dark:hover:bg-slate-500 shadow-lg" />
                    </>
                )}
            </Carousel>
        </div>
    );
}

export default MovieSlider;
