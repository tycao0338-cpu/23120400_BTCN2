import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav className="bg-blue-100 dark:bg-slate-700 border-b border-gray-300 dark:border-slate-600 px-4 py-2 flex items-center justify-between transition-colors">
            {/* Home Icon */}
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white text-xl">
                🏠
            </Link>

            {/* Search Bar */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search"
                    className="px-3 py-1.5 bg-white dark:bg-slate-600 border border-gray-400 dark:border-slate-500 rounded text-sm w-48 focus:outline-none focus:border-sky-500 dark:text-white dark:placeholder-gray-400"
                />
                <button className="px-4 py-1.5 bg-gray-200 dark:bg-slate-500 border border-gray-400 dark:border-slate-400 rounded text-sm hover:bg-gray-300 dark:hover:bg-slate-400 dark:text-white transition-colors">
                    Search
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
