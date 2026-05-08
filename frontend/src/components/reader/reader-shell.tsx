import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { neuromantReader } from "@/data/reader";

export function ReaderShell() {
  return (
    <main className="reader-page">
      <section className="site-shell site-shell--reader">
        <header className="reader-topbar">
          <div className="reader-topbar__left">
            <Link href="/catalog/neuromant" className="reader-topbar__button" aria-label="Назад к произведению">
              <AppIcon name="back" className="reader-icon" />
            </Link>

            <div className="reader-topbar__meta">
              <p className="reader-topbar__eyebrow">{neuromantReader.archiveLabel}</p>
              <p className="reader-topbar__title">{neuromantReader.chapterLabel}</p>
            </div>
          </div>

          <div className="reader-topbar__actions">
            <Link
              href="/catalog/neuromant/read/focus"
              className="reader-topbar__button"
              aria-label="Особый режим чтения"
            >
              <AppIcon name="sliders" className="reader-icon" />
            </Link>
            <button className="reader-topbar__button" type="button" aria-label="Сохранить прогресс">
              <AppIcon name="bookmark" className="reader-icon" />
            </button>
          </div>
        </header>

        <section className="reader-body">
          <div className="reader-article">
            <h1 className="reader-article__title">{neuromantReader.title}</h1>

            <div className="reader-article__content">
              {neuromantReader.paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 12)}`} className="reader-article__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="reader-chapter-nav">
              <button className="reader-chapter-nav__button reader-chapter-nav__button--secondary" type="button">
                <AppIcon name="arrow-left" className="reader-icon" />
                <span>Предыдущая глава</span>
              </button>

              <p className="reader-chapter-nav__status">{neuromantReader.chapterIndexText}</p>

              <button className="reader-chapter-nav__button reader-chapter-nav__button--primary" type="button">
                <span>Следующая глава</span>
                <AppIcon name="arrow-right" className="reader-icon" />
              </button>
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
