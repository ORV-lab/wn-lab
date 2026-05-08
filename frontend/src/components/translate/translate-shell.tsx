import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const translateHero =
  "https://www.figma.com/api/mcp/asset/40beacef-3d65-4f0b-8fdc-01b706b8c542";

const historyItems = [
  { title: "Omniscient Reader...", langs: "KR → RU", time: "Вчера" },
  { title: "The Beginning After...", langs: "EN → RU", time: "3 дня назад" },
  { title: "Lord of the Mysteries", langs: "CN → RU", time: "Неделю назад" },
] as const;

const queueItems = [
  { user: "m***_star", file: "The_Veil.epub", progress: 64, status: "#1" },
  { user: "k***_arch", file: "Otter_City.docx", progress: 22, status: "#2" },
  { user: "n***_runner", file: "Neon_Dream.pdf", progress: 8, status: "#3" },
  { user: "l***_hacker", file: "Data_Sinsmora.docx", progress: 1, status: "#4" },
  { user: "r***_bot", file: "Iron_Soul.epub", progress: 0, status: "#5" },
] as const;

export function TranslateShell() {
  return (
    <main className="translate-page">
      <section className="site-shell site-shell--translate">
        <SiteHeader active="translate" />

        <section className="translate-hero">
          <img className="translate-hero__image" src={translateHero} alt="" />
          <div className="translate-hero__overlay translate-hero__overlay--vertical" />
          <div className="translate-hero__overlay translate-hero__overlay--horizontal" />

          <div className="translate-hero__content">
            <span className="translate-chip">
              <AppIcon name="bolt" className="translate-chip__icon" />
              Архивариус Engine v4.2
            </span>
            <h1 className="translate-hero__title">ИИ-Переводчик</h1>
            <p className="translate-hero__text">
              Адаптивный художественный перевод новелл с сохранением авторского
              стиля и контекста.
            </p>
          </div>
        </section>

        <section className="translate-content">
          <div className="translate-main">
            <div className="translate-top-grid">
              <article className="translate-card translate-card--glow-teal">
                <div className="translate-card__title-row">
                  <AppIcon name="book" className="translate-card__icon translate-card__icon-tone--teal" />
                  <h2 className="translate-card__title">Параметры работы</h2>
                </div>

                <div className="translate-form">
                  <label className="translate-field">
                    <span className="translate-field__label">Оригинальное название</span>
                    <input
                      className="translate-field__input"
                      type="text"
                      defaultValue="Например: Heaven Official's Blessing"
                    />
                  </label>

                  <label className="translate-field">
                    <span className="translate-field__label">Автор (опционально)</span>
                    <input
                      className="translate-field__input"
                      type="text"
                      defaultValue="Имя автора"
                    />
                  </label>
                </div>
              </article>

              <article className="translate-card translate-card--glow-amber">
                <div className="translate-card__title-row">
                  <AppIcon name="settings" className="translate-card__icon translate-card__icon-tone--amber" />
                  <h2 className="translate-card__title">Языковые настройки</h2>
                </div>

                <div className="translate-form">
                  <label className="translate-field">
                    <span className="translate-field__label">С какого языка переводим?</span>
                    <button className="translate-select" type="button">
                      Корейский
                      <span className="translate-select__caret" />
                    </button>
                  </label>

                  <label className="translate-field">
                    <span className="translate-field__label">На какой язык?</span>
                    <button className="translate-select" type="button">
                      Русский
                      <span className="translate-select__caret" />
                    </button>
                  </label>
                </div>
              </article>
            </div>

            <article className="translate-card translate-upload">
              <div className="translate-card__title-row">
                <AppIcon name="upload" className="translate-card__icon translate-card__icon-tone--teal" />
                <h2 className="translate-card__title">Загрузите исходный файл</h2>
              </div>

              <div className="translate-dropzone">
                <div className="translate-dropzone__orb">
                  <AppIcon name="upload" className="translate-dropzone__upload-icon" />
                </div>
                <h3 className="translate-dropzone__title">Перетащите файл сюда</h3>
                <p className="translate-dropzone__text">
                  Поддерживаются форматы: .txt, .epub, .pdf, .docx.
                  <br />
                  Максимальный размер файла 50MB.
                </p>
                <button className="translate-dropzone__button" type="button">
                  Обзор файлов
                </button>
              </div>
            </article>

            <article className="translate-card translate-queue">
              <div className="translate-queue__head">
                <div className="translate-card__title-row">
                  <AppIcon name="queue" className="translate-card__icon translate-card__icon-tone--teal" />
                  <h2 className="translate-card__title">Глобальная очередь (Live)</h2>
                </div>
                <div className="translate-queue__live">
                  <span className="translate-queue__live-dot" />
                  Обработка в реальном времени
                </div>
              </div>

              <div className="translate-queue__table-head">
                <span>Пользователь</span>
                <span>Прогресс</span>
                <span>Статус</span>
              </div>

              <div className="translate-queue__rows">
                {queueItems.map((item) => (
                  <div key={item.user} className="translate-queue__row">
                    <div className="translate-queue__user">
                      <span className="translate-queue__avatar">{item.user[0].toUpperCase()}</span>
                      <div>
                        <p className="translate-queue__user-name">{item.user}</p>
                        <p className="translate-queue__user-file">{item.file}</p>
                      </div>
                    </div>

                    <div className="translate-queue__progress">
                      <div className="translate-queue__progress-track">
                        <div
                          className="translate-queue__progress-fill"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="translate-queue__progress-label">{item.progress}%</span>
                    </div>

                    <span className="translate-queue__status">{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="translate-queue__footer">
                <AppIcon name="clock" className="translate-queue__footer-icon" />
                Ожидаемое время обработки: ~4.2 мин
              </div>
            </article>

            <article className="translate-card translate-launch">
              <div className="translate-launch__note">
                <AppIcon name="clock" className="translate-launch__note-icon" />
                Время обработки зависит от объема текста
              </div>

              <button className="translate-launch__button" type="button">
                <AppIcon name="bolt" className="translate-launch__button-icon" />
                Начать перевод
              </button>
            </article>
          </div>

          <aside className="translate-sidebar">
            <article className="translate-card translate-history">
              <div className="translate-card__title-row">
                <AppIcon name="history" className="translate-card__icon translate-card__icon-tone--text" />
                <h2 className="translate-card__title translate-card__title--small">
                  История переводов
                </h2>
              </div>

              <div className="translate-history__list">
                {historyItems.map((item) => (
                  <div key={item.title} className="translate-history__item">
                    <div className="translate-history__item-icon">
                      <AppIcon name="history" className="translate-history__doc-icon" />
                    </div>
                    <div className="translate-history__item-body">
                      <p className="translate-history__item-title">{item.title}</p>
                      <div className="translate-history__item-meta">
                        <span>{item.langs}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="translate-history__button" type="button">
                Показать все
              </button>
            </article>

            <article className="translate-card translate-status">
              <div className="translate-card__title-row">
                <AppIcon name="status" className="translate-card__icon translate-card__icon-tone--teal" />
                <h2 className="translate-card__title translate-card__title--small">
                  Статус серверов
                </h2>
              </div>

              <div className="translate-status__rows">
                <div className="translate-status__row">
                  <span>Активные ноды</span>
                  <strong className="translate-status__value translate-status__value--accent">
                    12/12
                  </strong>
                </div>
                <div className="translate-status__row">
                  <span>Глобальная очередь</span>
                  <strong className="translate-status__value">428 файлов</strong>
                </div>
                <div className="translate-status__row">
                  <span>Среднее ожидание</span>
                  <strong className="translate-status__value">4.2 мин</strong>
                </div>
              </div>

              <div className="translate-status__pro">
                <div className="translate-status__pro-head">
                  <AppIcon name="bolt" className="translate-status__pro-icon" />
                  <span>Pro-статус</span>
                </div>
                <p className="translate-status__pro-text">
                  Приоритетный доступ к нейросетям без ожидания в очереди.
                </p>
                <button className="translate-status__pro-button" type="button">
                  Улучшить аккаунт
                </button>
              </div>
            </article>
          </aside>
        </section>

        <div className="translate-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
