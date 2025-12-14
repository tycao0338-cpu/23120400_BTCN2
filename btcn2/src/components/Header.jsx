import { NavBar } from "./NavBar";

export function Header() {
    return (
        <header className="w-full">
            {/* Top Header Bar */}
            <div className="flex items-center h-12">
                {/* MSSV Logo - Pink background */}
                <div className="bg-sky-400 px-4 h-full flex items-center">
                    <span className="text-pink-800 font-medium text-sm">&lt;23120400&gt;</span>
                </div>

                {/* Title - Blue background */}
                <div className="flex-1 bg-sky-400 h-full flex items-center justify-center">
                    <h1 className="text-white font-semibold text-lg">Movies info</h1>
                </div>

                {/* Theme Toggle & User Icon */}
                <div className="bg-sky-400 px-4 h-full flex items-center gap-3">
                    {/* Sun Icon */}


                    {/* Toggle Switch */}
                    <button className="relative w-10 h-5 bg-white/30 rounded-full transition-colors">
                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"></span>
                    </button>

                    {/* User Icon */}
                    <span className="text-yellow-300 text-xl">☀️</span>
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

