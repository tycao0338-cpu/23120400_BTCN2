import { MovieCard } from "@/components/movie/MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * MovieRow - Carousel phim sử dụng Shadcn/Embla Carousel
 * - Hiệu ứng slide mượt giống CarouselDemo
 * - Hiển thị 3 phim một lúc
 *
 * @param {string} title - Tiêu đề section
 * @param {Array} movies - Danh sách phim
 * @param {boolean} isLoading - Trạng thái loading
 * @param {Function} onRemove - Callback khi remove movie (optional, cho Favorites)
 * @param {string|number} removingId - ID của movie đang được remove
 */
export function MovieRow({
  title,
  movies = [],
  isLoading = false,
  onRemove,
  removingId,
}) {
  return (
    <div className="mx-4 mb-6">
      {/* Header với title */}
      {title && (
        <h2 className="text-xl font-bold dark:text-white mb-4">{title}</h2>
      )}

      {/* Carousel - giống CarouselDemo */}
      <Carousel
        className="w-full max-w-4xl mx-auto px-8"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <CarouselItem key={i} className="basis-1/3">
                <div className="p-1">
                  <div className="w-48 h-80 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                </div>
              </CarouselItem>
            ))
          ) : movies.length > 0 ? (
            // Render movie cards
            movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/3 overflow-visible"
              >
                <div className="py-4 px-8">
                  <MovieCard
                    movie={movie}
                    onRemove={onRemove}
                    isRemoving={removingId === movie.id}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            // Empty state
            <CarouselItem className="basis-full">
              <div className="flex items-center justify-center h-80">
                <p className="text-gray-500 dark:text-gray-400">
                  No movies found
                </p>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default MovieRow;
