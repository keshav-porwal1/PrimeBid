import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setIsDark(!isDark);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="fixed top-4 right-4 z-50 flex items-center w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer shadow-md transition-colors hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-lg flex items-center justify-center text-yellow-400 transform transition-transform duration-300 ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? <FiMoon size={18} /> : <FiSun size={18} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
