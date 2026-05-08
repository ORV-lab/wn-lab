import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";

type ActiveTab = "home" | "catalog" | "translate" | "library" | "none";

type SiteHeaderProps = {
  active: ActiveTab;
};

const navigation = [
  { key: "home", label: "Главная", href: "/" },
  { key: "catalog", label: "Каталог", href: "/catalog" },
  { key: "translate", label: "ИИ-Перевод", href: "/translate" },
  { key: "library", label: "Моя библиотека", href: "/library" },
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="topbar">
      <div className="brand-cluster">
        <div className="brand">
          <span className="brand__mark">
            <span className="brand__mark-inner" />
          </span>
          <span className="brand__label">WN-Lab</span>
        </div>

        <nav className="nav">
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={
                active === item.key ? "nav__link nav__link--active" : "nav__link"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="header-actions" aria-label="Действия">
        <button className="icon-button" type="button" aria-label="Поиск">
          <AppIcon name="search" className="icon" />
        </button>
        <Link className="icon-button" href="/notifications" aria-label="Уведомления">
          <AppIcon name="bell" className="icon" />
        </Link>
        <Link className="icon-button" href="/profile" aria-label="Профиль">
          <AppIcon name="user" className="icon" />
        </Link>
        <Link className="icon-button" href="/settings" aria-label="Настройки">
          <AppIcon name="settings" className="icon" />
        </Link>
      </div>
    </header>
  );
}
