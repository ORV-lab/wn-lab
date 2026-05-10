import Link from "next/link";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { formatRelativeDate } from "@/lib/time";
import type { HomeResponse } from "@/lib/types";

type LibraryShellProps = {
  data: HomeResponse;
};

export function LibraryShell({ data }: LibraryShellProps) {
  return (
    <main className="library-page">
      <section className="site-shell site-shell--home">
        <SiteHeader active="home" />

        <section className="hero">
          <div className="hero__media">
            <div className="hero__media-placeholder">
              <div className="hero__media-icon" />
            </div>
            <div className="hero__overlay" />
          </div>

          <div className="hero__content">
            <div className="hero__eyebrow-row">
              <span className="hero__bolt">⌁</span>
              <p className="hero__eyebrow">Рекомендация архива</p>
            </div>

            <h1 className="hero__title">
              Где <em>литература</em>
              <br />
              встречает <em>будущее</em>.
            </h1>

            <p className="hero__text">
              Погрузитесь в частный цифровой архив, где передовые алгоритмы ИИ-перевода
              сохраняют дух оригинала.
            </p>

            <div className="hero__actions">
              <Link className="button button--primary" href={data.continueReading[0]?.readUrl ?? "/catalog"}>
                Начать чтение
              </Link>
              <Link className="button button--secondary" href="/catalog">
                Каталог
              </Link>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="section-block">
            <div className="section-heading">
              <div className="section-heading__title-wrap">
                <span className="section-heading__icon section-heading__icon--teal" />
                <h2 className="section-heading__title">Продолжить чтение</h2>
              </div>
              <Link className="section-heading__action" href="/library/reading">
                Смотреть всё
              </Link>
            </div>

            <div className="continue-grid">
              {data.continueReading.map((item) => (
                <Link key={item.bookId} href={item.readUrl} className="continue-card">
                  <img className="continue-card__cover" src={item.coverUrl} alt={item.title} />
                  <div className="continue-card__body">
                    <h3 className="continue-card__title">{item.title}</h3>
                    <p className="continue-card__chapter">{item.chapterTitle}</p>
                    <div className="continue-card__progress">
                      <div className="continue-card__track">
                        <div className="continue-card__fill" style={{ width: `${item.progress}%` }} />
                      </div>
                      <div className="continue-card__meta">
                        <span>Прогресс</span>
                        <span>{item.progress}%</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div className="section-heading__title-wrap">
                <span className="section-heading__icon section-heading__icon--orange" />
                <h2 className="section-heading__title">Популярное за неделю</h2>
              </div>
              <Link className="section-heading__action" href="/catalog?sort=rating">
                Весь топ
              </Link>
            </div>

            <div className="popular-grid">
              {data.popularThisWeek.map((item) => (
                <Link key={item.bookId} href={`/catalog/${item.slug}`} className="popular-card">
                  <div className="popular-card__image-wrap">
                    <img className="popular-card__image" src={item.coverUrl} alt={item.title} />
                    <span className="popular-card__badge">★ {item.rating.toFixed(1)}</span>
                  </div>
                  <h3 className="popular-card__title">{item.title}</h3>
                  <p className="popular-card__author">{item.author}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div className="section-heading__title-wrap">
                <span className="section-heading__icon section-heading__icon--green" />
                <h2 className="section-heading__title">Последние обновления</h2>
              </div>
              <Link className="section-heading__action" href="/catalog?sort=updated">
                Архив обновлений
              </Link>
            </div>

            <div className="updates-grid">
              {data.latestUpdates.map((item) => (
                <Link
                  key={`${item.bookId}-${item.chapterNumber}`}
                  href={`/catalog/${item.slug}/read?chapter=${item.chapterNumber}`}
                  className="update-card"
                >
                  <img className="update-card__cover" src={item.coverUrl} alt={item.title} />
                  <div className="update-card__body">
                    <h3 className="update-card__title">{item.title}</h3>
                    <div className="update-card__row">
                      <span className="update-card__tag">{item.chapterTitle}</span>
                      <span className="update-card__time">{formatRelativeDate(item.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="collection-banner">
            <img
              className="collection-banner__image"
              src={data.featuredCollection.coverUrl}
              alt={data.featuredCollection.title}
            />
            <div className="collection-banner__overlay" />
            <div className="collection-banner__content">
              <p className="collection-banner__eyebrow">{data.featuredCollection.eyebrow}</p>
              <h2 className="collection-banner__title">{data.featuredCollection.title}</h2>
              <p className="collection-banner__text">{data.featuredCollection.description}</p>
              <Link className="button button--light" href={data.featuredCollection.href}>
                Исследовать
              </Link>
            </div>
          </section>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
