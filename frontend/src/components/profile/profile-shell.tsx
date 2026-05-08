import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const profileCover =
  "https://www.figma.com/api/mcp/asset/f93f0474-cbec-4cca-9f1c-27609b25f9c3";
const profileAvatar =
  "https://www.figma.com/api/mcp/asset/dbd3445b-b1e2-4065-98df-58dae30e502e";

const stats = [
  { value: "142", label: "Прочитано книг", tone: "teal", icon: "book" },
  { value: "842", label: "Часов чтения", tone: "amber", icon: "clock" },
  { value: "56", label: "Оставлено отзывов", tone: "green", icon: "pen" },
  { value: "2,450", label: "Карма", tone: "gold", icon: "bolt" },
] as const;

const achievements = [
  {
    title: "Кибер-Архивариус",
    subtitle: "Прочитано 50 sci-fi книг",
    badge: "Легендарное",
    tone: "teal",
    icon: "shield",
  },
  {
    title: "Ночная Сова",
    subtitle: "Чтение после 2:00 ночи 7 дней подряд",
    badge: "Редкое",
    tone: "bronze",
    icon: "star",
  },
  {
    title: "Полиглот ИИ",
    subtitle: "Прочитано на 3 разных языках перевода",
    badge: "Эпическое",
    tone: "violet",
    icon: "ribbon",
  },
  {
    title: "Секретное достижение (???)",
    subtitle: "",
    badge: "",
    tone: "ghost",
    icon: "lock",
  },
] as const;

const activity = [
  {
    text: "Прочитал главу 14 Нейромант",
    meta: "Системная метка: READ_LOG_4042",
    time: "2 часа назад",
    icon: "book",
    tone: "teal",
  },
  {
    text: "Оставил комментарий к Дюна",
    meta: "Системная метка: COMMENT_LOG_5468",
    time: "Вчера",
    icon: "comment",
    tone: "blue",
  },
  {
    text: "Добавил в избранное Мечтают ли андроиды об электроовцах?",
    meta: "Системная метка: FAVORITE_LOG_6899",
    time: "3 дня назад",
    icon: "heart",
    tone: "red",
  },
  {
    text: "Завершил чтение Основание",
    meta: "Системная метка: COMPLETE_LOG_4397",
    time: "Неделю назад",
    icon: "check",
    tone: "green",
  },
  {
    text: "Прочитал главу 5 Ложная слепота",
    meta: "Системная метка: READ_LOG_1557",
    time: "10 дней назад",
    icon: "book",
    tone: "teal",
  },
  {
    text: "Ответил пользователю в Лавина",
    meta: "Системная метка: COMMENT_LOG_1572",
    time: "12 дней назад",
    icon: "comment",
    tone: "blue",
  },
  {
    text: "Прочитал главу 1 Видоизмененный углерод",
    meta: "Системная метка: READ_LOG_3127",
    time: "2 недели назад",
    icon: "book",
    tone: "teal",
  },
] as const;

export function ProfileShell() {
  return (
    <main className="profile-page">
      <section className="site-shell site-shell--profile">
        <SiteHeader active="none" />

        <section className="profile-hero">
          <img className="profile-hero__cover" src={profileCover} alt="" />
          <div className="profile-hero__overlay" />

          <div className="profile-hero__identity">
            <div className="profile-avatar">
              <img className="profile-avatar__image" src={profileAvatar} alt="Alex Reader" />
            </div>

            <div className="profile-hero__summary">
              <h1 className="profile-hero__name">Alex Reader</h1>
              <div className="profile-hero__meta">
                <span className="profile-pill profile-pill--teal">Уровень 42</span>
                <span className="profile-pill profile-pill--orange">14 дней подряд</span>
                <span className="profile-contact">
                  <span className="profile-contact__icon" />
                  alex.reader@wn-lab.io
                </span>
              </div>
            </div>

            <div className="profile-hero__actions">
              <button className="profile-button profile-button--ghost" type="button">
                Поделиться
              </button>
              <button className="profile-button profile-button--primary" type="button">
                Редактировать
              </button>
            </div>
          </div>
        </section>

        <section className="profile-content">
          <div className="profile-sidebar">
            <article className="profile-card profile-about">
              <h2 className="profile-card__title">О себе</h2>
              <p className="profile-about__text">
                Исследователь цифровых миров, коллекционер редких изданий золотого
                века фантастики. Предпочитаю художественный стиль ИИ-перевода.
              </p>

              <div className="profile-about__meta">
                <div className="profile-about__row">
                  <span>Регистрация</span>
                  <strong>15 Октября 2023</strong>
                </div>
                <div className="profile-about__row">
                  <span>Любимый жанр</span>
                  <strong className="profile-about__accent">Киберпанк</strong>
                </div>
              </div>
            </article>

            <div className="profile-stats">
              {stats.map((item) => (
                <article key={item.label} className="profile-stat-card">
                  <div className={`profile-stat-card__icon profile-stat-card__icon--${item.tone}`}>
                    <AppIcon
                      name={item.icon as "book" | "clock" | "pen" | "bolt"}
                      className="profile-glyph"
                    />
                  </div>
                  <p className="profile-stat-card__value">{item.value}</p>
                  <p className="profile-stat-card__label">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="profile-main">
            <article className="profile-card">
              <div className="profile-section-head">
                <h2 className="profile-card__title">Достижения</h2>
                <button className="profile-section-head__action" type="button">
                  Смотреть все (24)
                </button>
              </div>

              <div className="profile-achievements">
                {achievements.map((item) => (
                  <article
                    key={item.title}
                    className={`achievement-card achievement-card--${item.tone}`}
                  >
                    <div className="achievement-card__icon">
                      <AppIcon
                        name={item.icon as "shield" | "star" | "ribbon" | "lock"}
                        className="profile-glyph"
                      />
                    </div>
                    <div className="achievement-card__body">
                      <div className="achievement-card__title-row">
                        <h3 className="achievement-card__title">{item.title}</h3>
                        {item.badge ? (
                          <span className="achievement-card__badge">{item.badge}</span>
                        ) : null}
                      </div>
                      {item.subtitle ? (
                        <p className="achievement-card__text">{item.subtitle}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="profile-card profile-activity">
              <div className="profile-section-head">
                <h2 className="profile-card__title">История активности</h2>
                <div className="profile-counter">Всего действий: 1,248</div>
              </div>

              <div className="activity-log">
                {activity.map((item) => (
                  <div key={`${item.text}-${item.time}`} className="activity-log__row">
                    <div className={`activity-log__icon activity-log__icon--${item.tone}`}>
                      <AppIcon
                        name={item.icon as "book" | "comment" | "heart" | "check"}
                        className="profile-glyph"
                      />
                    </div>
                    <div className="activity-log__body">
                      <div className="activity-log__top">
                        <p className="activity-log__text">{item.text}</p>
                        <span className="activity-log__time">{item.time}</span>
                      </div>
                      <div className="activity-log__meta">
                        <span className="activity-log__line" />
                        <span>{item.meta}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="activity-log__more" type="button">
                Загрузить больше активности
                <span className="activity-log__more-icon" />
              </button>
            </article>
          </div>
        </section>

        <div className="profile-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
