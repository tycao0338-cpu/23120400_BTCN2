import { Heart, Loader } from "lucide-react";

/**
 * FavoriteButton - Reusable favorite button component
 * Props:
 * - isFavorite: boolean - Whether item is favorited
 * - isLoading: boolean - Loading state
 * - onClick: function - Click handler
 * - className: string (optional) - Additional classes
 */
export function FavoriteButton({
  isFavorite = false,
  isLoading = false,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        isFavorite
          ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
          : "bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600"
      } ${className}`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <Loader size={20} className="animate-spin" />
      ) : isFavorite ? (
        <Heart size={20} className="fill-current" />
      ) : (
        <Heart size={20} />
      )}
      <span className="font-medium">Favourite</span>
    </button>
  );
}

export default FavoriteButton;
