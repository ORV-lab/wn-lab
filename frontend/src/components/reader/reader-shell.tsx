import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { SaveProgressButton } from "@/components/reader/save-progress-button";
import { SiteFooter } from "@/components/shared/site-footer";
import type { ReaderChapterResponse } from "@/lib/types";

type ReaderShellProps = {
  data: ReaderChapterResponse;
};

export function ReaderShell({ data }: ReaderShellProps) {
  return (
    <main className="reader-page">
      <section className="site-shell site-shell--reader">
        <header className="reader-topbar">
          <div className="reader-topbar__left">
            <Link href={`/catalog/${data.book.slug}`} className="reader-topbar__button" aria-label="Назад к произведению">
              <AppIcon name="back" className="reader-icon" />
            </Link>

            <div className="reader-topbar__meta">
              <p className="reader-topbar__eyebrow">WN-Lab • {data.book.author}</p>
              <p className="reader-topbar__title">
                {data.book.title} • Глава {data.chapter.number}
              </p>
            </div>
          </div>

          <div className="reader-topbar__actions">
            <Link
              href={`/catalog/${data.book.slug}/read/focus?chapter=${data.chapter.number}`}
              className="reader-topbar__button"
              aria-label="Особый режим чтения"
            >
              <AppIcon name="sliders" className="reader-icon" />
            </Link>
            <SaveProgressButton
              slug={data.book.slug}
              chapterNumber={data.chapter.number}
              progressPercent={data.progress?.progressPercent ?? 0}
            />
          </div>
        </header>

        <section className="reader-body">
          <div className="reader-article">
            <h1 className="reader-article__title">
              Глава {data.chapter.number}. {data.chapter.title}
            </h1>

            <div className="reader-article__content">
              {data.chapter.content.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 12)}`} className="reader-article__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="reader-chapter-nav">
              {data.chapter.previousChapterNumber ? (
                <Link
                  href={`/catalog/${data.book.slug}/read?chapter=${data.chapter.previousChapterNumber}`}
                  className="reader-chapter-nav__button reader-chapter-nav__button--secondary"
                >
                  <AppIcon name="arrow-left" className="reader-icon" />
                  <span>Предыдущая глава</span>
                </Link>
              ) : (
                <button className="reader-chapter-nav__button reader-chapter-nav__button--secondary" type="button" disabled>
                  <AppIcon name="arrow-left" className="reader-icon" />
                  <span>Предыдущая глава</span>
                </button>
              )}

              <p className="reader-chapter-nav__status">{data.chapterIndexText}</p>

              {data.chapter.nextChapterNumber ? (
                <Link
                  href={`/catalog/${data.book.slug}/read?chapter=${data.chapter.nextChapterNumber}`}
                  className="reader-chapter-nav__button reader-chapter-nav__button--primary"
                >
                  <span>Следующая глава</span>
                  <AppIcon name="arrow-right" className="reader-icon" />
                </Link>
              ) : (
                <button className="reader-chapter-nav__button reader-chapter-nav__button--primary" type="button" disabled>
                  <span>Следующая глава</span>
                  <AppIcon name="arrow-right" className="reader-icon" />
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="reader-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
