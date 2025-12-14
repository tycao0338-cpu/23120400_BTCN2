import { useState } from "react";

/**
 * ReviewItem - Reusable review card component
 * - Shows username, avatar, rating, content, date
 * - Handles spoiler blur with reveal functionality
 * Located in: src/components/review/ (theo README structure)
 */

export function ReviewItem({
    username,
    avatar,
    rating,
    content,
    title,
    date,
    isSpoiler = false,
}) {
    const [isRevealed, setIsRevealed] = useState(false);

    // Format date
    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : null;

    // Should blur content?
    const shouldBlur = isSpoiler && !isRevealed;

    return (
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md">
            {/* Header - User Info & Rating */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center overflow-hidden">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt={username}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                        ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-lg">
                                👤
                            </span>
                        )}
                    </div>

                    {/* Username & Date */}
                    <div>
                        <p className="font-semibold dark:text-white text-sm">
                            {username}
                        </p>
                        {formattedDate && (
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                {formattedDate}
                            </p>
                        )}
                    </div>
                </div>

                {/* Rating & Spoiler Badge */}
                <div className="flex items-center gap-2">
                    {/* Spoiler Badge */}
                    {isSpoiler && (
                        <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-full font-medium">
                            ⚠️ Spoiler
                        </span>
                    )}

                    {/* Rating */}
                    {rating && (
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                            <span>⭐</span>
                            <span className="font-medium">{rating}/10</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Review Title */}
            {title && (
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    {title}
                </h4>
            )}

            {/* Review Content - With Spoiler Blur */}
            <div className="relative">
                <p
                    className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-all duration-300 ${shouldBlur ? "blur-sm select-none" : ""
                        }`}
                >
                    {content}
                </p>

                {/* Reveal Button Overlay */}
                {shouldBlur && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-slate-700/30 backdrop-blur-[1px] rounded">
                        <button
                            onClick={() => setIsRevealed(true)}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg shadow-md transition-colors"
                        >
                            👁️ Show Content
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewItem;
