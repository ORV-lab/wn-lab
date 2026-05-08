import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { neuromantReader } from "@/data/reader";

export function ReaderFocusShell() {
  return (
    <main className="reader-focus-page">
      <section className="site-shell site-shell--reader-focus">
        <section className="reader-focus-body">
          <div className="reader-focus-article">
            <h1 className="reader-focus-article__title">{neuromantReader.title}</h1>

            <div className="reader-focus-article__content">
              {neuromantReader.paragraphs.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 12)}`}
                  className="reader-focus-article__paragraph"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="reader-focus-chapter-nav">
              <button
                className="reader-chapter-nav__button reader-chapter-nav__button--secondary"
                type="button"
              >
                <AppIcon name="arrow-left" className="reader-icon" />
                <span>Предыдущая глава</span>
              </button>

              <p className="reader-chapter-nav__status">{neuromantReader.chapterIndexText}</p>

              <button
                className="reader-chapter-nav__button reader-chapter-nav__button--primary"
                type="button"
              >
                <span>Следующая глава</span>
                <AppIcon name="arrow-right" className="reader-icon" />
              </button>
            </div>
          </div>
        </section>

        <Link
          href="/catalog/neuromant/read"
          className="reader-focus-exit"
          aria-label="Вернуться в обычный режим чтения"
        >
          <AppIcon name="close" className="reader-icon" />
        </Link>
      </section>
    </main>
  );
}
