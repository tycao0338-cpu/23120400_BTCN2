import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav className="bg-blue-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
            {/* Home Icon */}
            <Link to="/" className="text-gray-700 hover:text-gray-900 text-xl">
                🏠
            </Link>

            {/* Search Bar */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search"
                    className="px-3 py-1.5 bg-white border border-gray-400 rounded text-sm w-48 focus:outline-none focus:border-sky-500"
                />
                <button className="px-4 py-1.5 bg-gray-200 border border-gray-400 rounded text-sm hover:bg-gray-300 transition-colors">
                    Search
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
