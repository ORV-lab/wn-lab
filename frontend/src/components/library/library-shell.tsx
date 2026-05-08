import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import {
  libraryBooks,
  libraryCategoryMeta,
  type LibraryCategory,
} from "@/data/library";

type LibraryShellProps = {
  activeCategory: LibraryCategory;
};

const categoryOrder: LibraryCategory[] = ["all", "reading", "favorites", "completed"];

export function UserLibraryShell({ activeCategory }: LibraryShellProps) {
  const books = libraryBooks.filter((book) => book.categories.includes(activeCategory));

  return (
    <main className="library-hub-page">
      <section className="site-shell site-shell--library">
        <SiteHeader active="library" />

        <section className="library-hub-hero">
          <div className="library-hub-hero__copy">
            <h1 className="library-hub-hero__title">Личная Библиотека</h1>
            <p className="library-hub-hero__text">
              Ваша коллекция произведений, прогресс чтения и закладки.
            </p>
          </div>

          <div className="library-hub-toolbar">
            <div className="library-hub-tabs" role="tablist" aria-label="Категории библиотеки">
              {categoryOrder.map((category) => {
                const item = libraryCategoryMeta[category];
                const isActive = activeCategory === category;

                return (
                  <Link
                    key={category}
                    href={item.href}
                    className={
                      isActive
                        ? "library-hub-tab library-hub-tab--active"
                        : "library-hub-tab"
                    }
                    aria-current={isActive ? "page" : undefined}
                  >
                    <AppIcon name={item.icon as "stack" | "clock" | "bookmark" | "check"} className="library-hub-tab__icon" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <label className="library-hub-search">
              <AppIcon name="search" className="icon" />
              <input
                className="library-hub-search__input"
                type="text"
                placeholder="Поиск в библиотеке..."
              />
            </label>
          </div>
        </section>

        <section className="library-hub-content">
          <div className="library-hub-grid">
            {books.map((book) => (
              <Link key={book.id} href={book.href} className="library-hub-card">
                <div className="library-hub-card__cover-wrap">
                  <img
                    className="library-hub-card__cover"
                    src={book.cover}
                    alt={book.title}
                  />
                </div>

                <div className="library-hub-card__body">
                  <div className="library-hub-card__meta">
                    <h2 className="library-hub-card__title">{book.title}</h2>
                    <p className="library-hub-card__author">{book.author}</p>
                  </div>

                  <div className="library-hub-card__progress">
                    <div className="library-hub-card__progress-row">
                      <span>Прогресс</span>
                      <span>{book.progress}%</span>
                    </div>
                    <div className="library-hub-card__track">
                      <div
                        className="library-hub-card__fill"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="library-hub-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
