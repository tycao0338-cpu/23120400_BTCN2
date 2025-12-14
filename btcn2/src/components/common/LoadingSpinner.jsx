/**
 * LoadingSpinner - Centered loading spinner component
 * Located in: src/components/common/
 */

export function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] py-20">
            {/* Spinning Circle */}
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>

            {/* Loading Message */}
            <p className="text-gray-500 dark:text-gray-400">{message}</p>
        </div>
    );
}

export default LoadingSpinner;
