import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";

/**
 * NavBar - Navigation bar component with glassmorphism effect
 * - Dropdown: By Title / By Person
 * - Search bar navigates to /search?q=...&by=...
 * Located in: src/layouts/ (theo README structure)
 */

export function NavBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchBy, setSearchBy] = useState("title"); // "title" or "person"
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&by=${searchBy}`);
        }
    };

    return (
        <nav className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 px-4 py-2.5 flex items-center justify-between transition-colors shadow-sm">
            {/* Home Icon */}
            <Link
                to="/"
                className="p-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-600 hover:to-indigo-600 transition-all shadow-sm hover:shadow-md"
            >
                <Home size={20} />
            </Link>

            {/* Search Bar with Dropdown */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
                {/* Search By Dropdown */}
                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white cursor-pointer transition-all"
                >
                    <option value="title">By Title</option>
                    <option value="person">By Person</option>
                </select>

                {/* Search Input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchBy === "title" ? "Search movie title..." : "Search actor/director..."}
                    className="px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white dark:placeholder-gray-400 transition-all"
                />

                {/* Search Button - Gradient */}
                <button
                    type="submit"
                    className="p-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                    <Search size={18} />
                </button>
            </form>
        </nav>
    );
}

export default NavBar;
