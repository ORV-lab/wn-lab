import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { FavoriteToggle } from "@/components/catalog/favorite-toggle";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { formatRelativeDate } from "@/lib/time";
import type { BookDetailResponse } from "@/lib/types";

type RanobeDetailShellProps = {
  data: BookDetailResponse;
};

export function RanobeDetailShell({ data }: RanobeDetailShellProps) {
  const currentChapter = data.userState?.progress?.chapterNumber ?? data.chapters[0]?.number ?? 1;
  const lastPublishedAt = data.chapters.at(-1)?.publishedAt;

  return (
    <main className="detail-page">
      <section className="site-shell site-shell--detail">
        <SiteHeader active="catalog" />

        <section className="detail-content">
          <Link href="/catalog" className="detail-back">
            <span className="detail-back__icon">←</span>
            <span>Назад в архив</span>
          </Link>

          <div className="detail-hero">
            <div className="detail-cover">
              <img className="detail-cover__image" src={data.book.coverUrl} alt={data.book.title} />
            </div>

            <div className="detail-main">
              <div className="detail-main__top">
                <div>
                  <p className="detail-main__eyebrow">{data.book.genres[0] ?? "Архив"}</p>
                  <h1 className="detail-main__title">{data.book.title}</h1>
                  <p className="detail-main__author">{data.book.author}</p>
                </div>

                <div className="detail-actions">
                  <FavoriteToggle slug={data.book.slug} initialValue={Boolean(data.userState?.isFavorite)} />
                  <button className="detail-icon-button" type="button" aria-label="Поделиться">
                    <AppIcon name="share" className="detail-icon" />
                  </button>
                </div>
              </div>

              <div className="detail-stats">
                <div className="detail-stat">
                  <p className="detail-stat__label">Рейтинг</p>
                  <p className="detail-stat__value">
                    {data.book.rating.toFixed(1)} <span className="detail-stat__accent">★</span>
                  </p>
                </div>
                <div className="detail-stat">
                  <p className="detail-stat__label">Год издания</p>
                  <p className="detail-stat__value">{data.book.publicationYear ?? "—"}</p>
                </div>
                <div className="detail-stat">
                  <p className="detail-stat__label">Статус перевода</p>
                  <p className="detail-stat__value detail-stat__value--accent">
                    {data.book.translationProgress}%
                  </p>
                </div>
              </div>

              <div className="detail-summary">
                <h2 className="detail-summary__title">Синопсис</h2>
                <p className="detail-summary__text">{data.book.description}</p>
              </div>

              <div className="detail-summary">
                <h2 className="detail-summary__title">Главы</h2>
                <p className="detail-summary__text">
                  Доступно {data.chapters.length} глав.
                  {lastPublishedAt ? ` Последнее обновление ${formatRelativeDate(lastPublishedAt)}.` : ""}
                </p>
              </div>

              <div className="detail-cta">
                <Link href={`/catalog/${data.book.slug}/read?chapter=${currentChapter}`} className="detail-cta__primary">
                  <AppIcon name="read" className="detail-cta__icon" />
                  Читать
                </Link>
                <button className="detail-cta__secondary" type="button">
                  <AppIcon name="download" className="detail-cta__icon" />
                  Скачать для оффлайн
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="detail-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
