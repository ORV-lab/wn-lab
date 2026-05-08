import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import {
  continueReading,
  cyberpunkCollection,
  latestUpdates,
  popularThisWeek,
} from "@/data/mock-library";

export function LibraryShell() {
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
              Погрузитесь в частный цифровой архив, где передовые алгоритмы
              ИИ-перевода сохраняют дух оригинала.
            </p>

            <div className="hero__actions">
              <button className="button button--primary" type="button">
                Начать чтение
              </button>
              <button className="button button--secondary" type="button">
                Каталог
              </button>
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
              <a className="section-heading__action" href="#">
                Смотреть всё
              </a>
            </div>

            <div className="continue-grid">
              {continueReading.map((item) => (
                <article key={item.id} className="continue-card">
                  <img className="continue-card__cover" src={item.cover} alt={item.title} />
                  <div className="continue-card__body">
                    <h3 className="continue-card__title">{item.title}</h3>
                    <p className="continue-card__chapter">{item.chapter}</p>
                    <div className="continue-card__progress">
                      <div className="continue-card__track">
                        <div
                          className="continue-card__fill"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <div className="continue-card__meta">
                        <span>Прогресс</span>
                        <span>{item.progress}%</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div className="section-heading__title-wrap">
                <span className="section-heading__icon section-heading__icon--orange" />
                <h2 className="section-heading__title">Популярное за неделю</h2>
              </div>
              <a className="section-heading__action" href="#">
                Весь топ
              </a>
            </div>

            <div className="popular-grid">
              {popularThisWeek.map((item) => (
                <article key={item.id} className="popular-card">
                  <div className="popular-card__image-wrap">
                    <img className="popular-card__image" src={item.cover} alt={item.title} />
                    <span className="popular-card__badge">★ {item.badge}</span>
                  </div>
                  <h3 className="popular-card__title">{item.title}</h3>
                  <p className="popular-card__author">{item.author}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div className="section-heading__title-wrap">
                <span className="section-heading__icon section-heading__icon--green" />
                <h2 className="section-heading__title">Последние обновления</h2>
              </div>
              <a className="section-heading__action" href="#">
                Архив обновлений
              </a>
            </div>

            <div className="updates-grid">
              {latestUpdates.map((item) => (
                <article key={item.id} className="update-card">
                  <img className="update-card__cover" src={item.cover} alt={item.title} />
                  <div className="update-card__body">
                    <h3 className="update-card__title">{item.title}</h3>
                    <div className="update-card__row">
                      <span className="update-card__tag">{item.chapter}</span>
                      <span className="update-card__time">{item.when}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="collection-banner">
            <img
              className="collection-banner__image"
              src={cyberpunkCollection.cover}
              alt={cyberpunkCollection.title}
            />
            <div className="collection-banner__overlay" />
            <div className="collection-banner__content">
              <p className="collection-banner__eyebrow">
                {cyberpunkCollection.eyebrow}
              </p>
              <h2 className="collection-banner__title">{cyberpunkCollection.title}</h2>
              <p className="collection-banner__text">
                {cyberpunkCollection.description}
              </p>
              <button className="button button--light" type="button">
                Исследовать
              </button>
            </div>
          </section>

          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
