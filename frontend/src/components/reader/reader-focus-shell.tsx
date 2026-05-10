import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import type { ReaderChapterResponse } from "@/lib/types";

type ReaderFocusShellProps = {
  data: ReaderChapterResponse;
};

export function ReaderFocusShell({ data }: ReaderFocusShellProps) {
  return (
    <main className="reader-focus-page">
      <section className="site-shell site-shell--reader-focus">
        <section className="reader-focus-body">
          <div className="reader-focus-article">
            <h1 className="reader-focus-article__title">
              Глава {data.chapter.number}. {data.chapter.title}
            </h1>

            <div className="reader-focus-article__content">
              {data.chapter.content.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 12)}`} className="reader-focus-article__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="reader-focus-chapter-nav">
              {data.chapter.previousChapterNumber ? (
                <Link
                  href={`/catalog/${data.book.slug}/read/focus?chapter=${data.chapter.previousChapterNumber}`}
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
                  href={`/catalog/${data.book.slug}/read/focus?chapter=${data.chapter.nextChapterNumber}`}
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

        <Link
          href={`/catalog/${data.book.slug}/read?chapter=${data.chapter.number}`}
          className="reader-focus-exit"
          aria-label="Вернуться в обычный режим чтения"
        >
          <AppIcon name="close" className="reader-icon" />
        </Link>
      </section>
    </main>
  );
}
