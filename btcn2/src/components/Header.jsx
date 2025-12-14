import { NavBar } from "./NavBar";
import { useTheme } from "../hooks/useTheme";

export function Header() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="w-full">
            {/* Top Header Bar */}
            <div className="flex items-center h-12">
                {/* MSSV Logo - Pink background */}
                <div className="bg-sky-400 dark:bg-slate-700 px-4 h-full flex items-center">
                    <span className="text-pink-800 dark:text-pink-300 font-medium text-sm">&lt;23120400&gt;</span>
                </div>

                {/* Title - Blue background */}
                <div className="flex-1 bg-sky-400 dark:bg-slate-700 h-full flex items-center justify-center">
                    <h1 className="text-white font-semibold text-lg">Movies info</h1>
                </div>

                {/* Theme Toggle & User Icon */}
                <div className="bg-sky-400 dark:bg-slate-700 px-4 h-full flex items-center gap-3">
                    {/* Theme Icon */}


                    {/* Toggle Switch */}
                    <button
                        onClick={toggleTheme}
                        className={`relative w-10 h-5 rounded-full transition-colors ${isDark ? "bg-slate-600" : "bg-white/30"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDark ? "left-[22px]" : "left-0.5"
                                }`}
                        ></span>
                    </button>
                    <span className="text-xl">
                        {isDark ? "🌙" : "☀️"}
                    </span>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="mt-[5px]">
                <NavBar />
            </div>
        </header>
    );
}

export default Header;
