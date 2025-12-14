import { useState, useEffect } from "react";

/**
 * useTheme - Custom hook để quản lý Dark/Light mode
 * Lưu trạng thái theme vào localStorage
 */
export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        // Kiểm tra localStorage khi khởi tạo
        const saved = localStorage.getItem("theme");
        return saved === "dark";
    });

    useEffect(() => {
        // Cập nhật class trên document và lưu vào localStorage
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    return { isDark, toggleTheme };
}

export default useTheme;
