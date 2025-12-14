/**
 * HomePage - Trang chính (sẽ thêm Hero Carousel và Movie Sections ở Prompt 2, 3)
 */
export function HomePage() {
    return (
        <div className="flex-1 bg-gray-100">
            {/* Placeholder - Sẽ thêm Hero Carousel ở đây (Prompt 2) */}
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 m-4 rounded-lg">
                <p className="text-gray-500 text-lg"></p>
            </div>

            {/* Placeholder - Sẽ thêm Most Popular section ở đây (Prompt 3) */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Most Popular</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500"></p>
                </div>
            </div>

            {/* Placeholder - Sẽ thêm Top Rating section ở đây (Prompt 3) */}
            <div className="mx-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Top Rating</h2>
                <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500"></p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
