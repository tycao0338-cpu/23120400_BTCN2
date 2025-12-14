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

                {/* User Icon */}
                <div className="bg-sky-400 px-4 h-full flex items-center">
                    <span className="text-white text-xl">👤</span>
                </div>
            </div>

            {/* Navigation Bar */}
            <NavBar />
        </header>
    );
}

export default Header;

