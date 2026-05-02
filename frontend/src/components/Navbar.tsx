import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookMarked, Compass, Home, Layers, Moon, Search, SunMedium, UserRound } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Главная" },
  { path: "/catalog", icon: Search, label: "Каталог" },
  { path: "/library", icon: BookMarked, label: "Библиотека" },
  { path: "/collections", icon: Layers, label: "Подборки" },
  { path: "/profile", icon: UserRound, label: "Профиль" },
];

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  if (location.pathname.includes("/read/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#101b26]/88 backdrop-blur-2xl md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
        <Link to="/" className="hidden items-center gap-3 md:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <p className="novel-text-serif text-2xl font-semibold leading-none text-white">
              WN Atlas
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">
              Curated web novels
            </p>
          </div>
        </Link>

        <div className="mx-auto flex w-full items-center justify-between gap-1 rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-1.5 md:mx-0 md:w-auto md:gap-2 md:rounded-full md:bg-transparent md:p-0">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 transition-all duration-200 md:flex-row md:gap-2 md:px-4 ${
                  isActive
                    ? "bg-white text-[#101b26] shadow-[0_10px_30px_rgba(255,255,255,0.18)]"
                    : "text-white/58 hover:bg-white/6 hover:text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px] md:h-4 md:w-4" />
                <span className="truncate text-[10px] font-medium md:text-sm">{label}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsDark((value) => !value)}
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/78 transition-colors hover:bg-white/10 hover:text-white md:flex"
          aria-label="Переключить тему"
        >
          {isDark ? <SunMedium className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
