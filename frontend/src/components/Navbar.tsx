import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Search, User, History, Home, Moon, Sun, Layers } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  if (location.pathname.includes("/read/")) return null;

  const navItems = [
    { path: "/", icon: Home, label: "Главная" },
    { path: "/catalog", icon: Search, label: "Каталог" },
    { path: "/library", icon: BookOpen, label: "Библиотека" },
    { path: "/collections", icon: Layers, label: "Коллекции" },
    { path: "/profile", icon: User, label: "Профиль" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-area-bottom md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="container flex items-center justify-between h-16 px-4 max-w-screen-lg mx-auto">
        <Link to="/" className="hidden md:flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground">НовеллыRU</span>
        </Link>

        <div className="flex items-center justify-around w-full md:w-auto md:gap-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] md:text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
