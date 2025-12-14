import { useState } from "react";

/**
 * Main - Component chính chứa các thông tin movie dựa vào trạng thái của trang
 */
export function Main() {
    // State để quản lý trạng thái trang (có thể mở rộng sau)
    const [activeSection, setActiveSection] = useState("home");

    return (
        <main className="flex-1 bg-gray-100 dark:bg-slate-800 transition-colors">
            {/* Hero Carousel Section */}
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-slate-600 m-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-lg"></p>
            </div>

            {/* Most Popular Section */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Most Popular</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400"></p>
                </div>
            </div>

            {/* Top Rating Section */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Top Rating</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400"></p>
                </div>
            </div>
        </main>
    );
}

export default Main;
