import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const coverImage =
  "https://www.figma.com/api/mcp/asset/e2f7ea6b-4963-4b38-b49c-31cb8fc2a305";

export function RanobeDetailShell() {
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
              <img className="detail-cover__image" src={coverImage} alt="Нейромант" />
            </div>

            <div className="detail-main">
              <div className="detail-main__top">
                <div>
                  <p className="detail-main__eyebrow">Научная фантастика</p>
                  <h1 className="detail-main__title">Нейромант</h1>
                  <p className="detail-main__author">Уильям Гибсон</p>
                </div>

                <div className="detail-actions">
                  <button className="detail-icon-button" type="button" aria-label="В избранное">
                    <AppIcon name="heart" className="detail-icon" />
                  </button>
                  <button className="detail-icon-button" type="button" aria-label="Поделиться">
                    <AppIcon name="share" className="detail-icon" />
                  </button>
                </div>
              </div>

              <div className="detail-stats">
                <div className="detail-stat">
                  <p className="detail-stat__label">Рейтинг</p>
                  <p className="detail-stat__value">
                    4.8 <span className="detail-stat__accent">★</span>
                  </p>
                </div>
                <div className="detail-stat">
                  <p className="detail-stat__label">Год издания</p>
                  <p className="detail-stat__value">1984</p>
                </div>
                <div className="detail-stat">
                  <p className="detail-stat__label">Статус перевода</p>
                  <p className="detail-stat__value detail-stat__value--accent">100%</p>
                </div>
              </div>

              <div className="detail-summary">
                <h2 className="detail-summary__title">Синопсис</h2>
                <p className="detail-summary__text">
                  Классический киберпанк-роман, открывший миру матрицу и виртуальную
                  реальность. Кейс был лучшим хакером в спауле, пока не совершил
                  фатальную ошибку. Теперь у него есть последний шанс вернуться в
                  игру, но цена может оказаться слишком высокой.
                </p>
              </div>

              <div className="detail-cta">
                <Link href="/catalog/neuromant/read" className="detail-cta__primary">
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
