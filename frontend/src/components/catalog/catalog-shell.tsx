import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { catalogBooks } from "@/data/catalog";

export function CatalogShell() {
  return (
    <main className="catalog-page">
      <section className="site-shell site-shell--catalog">
        <SiteHeader active="catalog" />

        <section className="catalog-hero">
          <h1 className="catalog-hero__title">Архив Произведений</h1>
          <p className="catalog-hero__text">
            Структурированная база данных всех доступных текстов. ИИ-перевод в
            реальном времени, глубокий анализ и сохранение оригинального стиля.
          </p>

          <div className="catalog-toolbar">
            <label className="catalog-search">
              <AppIcon name="search" className="icon" />
              <input
                className="catalog-search__input"
                type="text"
                placeholder="Поиск по названию, автору или тегу..."
              />
            </label>

            <button className="catalog-toolbar__button" type="button">
              <AppIcon name="filter" className="catalog-toolbar__icon" />
              Фильтры
            </button>

            <button className="catalog-toolbar__button" type="button">
              <AppIcon name="sort" className="catalog-toolbar__icon" />
              Сортировка
            </button>
          </div>
        </section>

        <section className="catalog-grid-wrap">
          <div className="catalog-grid">
            {catalogBooks.map((book) => (
              <Link key={book.id} href={book.href} className="catalog-card">
                <div className="catalog-card__media">
                  <img className="catalog-card__image" src={book.cover} alt={book.title} />
                </div>
                <div className="catalog-card__body">
                  <h2 className="catalog-card__title">{book.title}</h2>
                  <p className="catalog-card__author">{book.author}</p>
                  <p className="catalog-card__tag">{book.tag}</p>
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
