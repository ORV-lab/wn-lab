import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import type { BooksResponse } from "@/lib/types";

type CatalogShellProps = {
  data: BooksResponse;
  query: {
    q?: string;
    genre?: string;
    status?: string;
    sort?: string;
  };
};

export function CatalogShell({ data, query }: CatalogShellProps) {
  return (
    <main className="catalog-page">
      <section className="site-shell site-shell--catalog">
        <SiteHeader active="catalog" />

        <section className="catalog-hero">
          <h1 className="catalog-hero__title">Архив Произведений</h1>
          <p className="catalog-hero__text">
            Структурированная база данных всех доступных текстов. ИИ-перевод в реальном
            времени, глубокий анализ и сохранение оригинального стиля.
          </p>

          <form className="catalog-toolbar" action="/catalog">
            <label className="catalog-search">
              <AppIcon name="search" className="icon" />
              <input
                className="catalog-search__input"
                name="q"
                type="text"
                defaultValue={query.q}
                placeholder="Поиск по названию, автору или тегу..."
              />
            </label>

            <select className="catalog-toolbar__button" name="status" defaultValue={query.status ?? ""}>
              <option value="">Все статусы</option>
              <option value="ongoing">В процессе</option>
              <option value="completed">Завершено</option>
              <option value="paused">Пауза</option>
            </select>

            <select className="catalog-toolbar__button" name="sort" defaultValue={query.sort ?? "popular"}>
              <option value="popular">Популярное</option>
              <option value="rating">Рейтинг</option>
              <option value="updated">Обновления</option>
              <option value="title">Название</option>
            </select>

            <button className="catalog-toolbar__button" type="submit">
              <AppIcon name="filter" className="catalog-toolbar__icon" />
              Применить
            </button>
          </form>
        </section>

        <section className="catalog-grid-wrap">
          <div className="catalog-grid">
            {data.items.map((book) => (
              <Link key={book.id} href={`/catalog/${book.slug}`} className="catalog-card">
                <div className="catalog-card__media">
                  <img className="catalog-card__image" src={book.coverUrl} alt={book.title} />
                </div>
                <div className="catalog-card__body">
                  <h2 className="catalog-card__title">{book.title}</h2>
                  <p className="catalog-card__author">{book.author}</p>
                  <p className="catalog-card__tag">{book.tags.join(" · ")}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="catalog-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
