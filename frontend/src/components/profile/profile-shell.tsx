import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { formatLongDate, formatRelativeDate } from "@/lib/time";
import type { ProfileResponse } from "@/lib/types";

type ProfileShellProps = {
  data: ProfileResponse;
};

const statDecor = [
  { tone: "teal", icon: "book" },
  { tone: "amber", icon: "clock" },
  { tone: "green", icon: "pen" },
  { tone: "gold", icon: "bolt" },
] as const;

export function ProfileShell({ data }: ProfileShellProps) {
  return (
    <main className="profile-page">
      <section className="site-shell site-shell--profile">
        <SiteHeader active="none" />

        <section className="profile-hero">
          <img className="profile-hero__cover" src={data.user.coverUrl ?? ""} alt="" />
          <div className="profile-hero__overlay" />

          <div className="profile-hero__identity">
            <div className="profile-avatar">
              <img className="profile-avatar__image" src={data.user.avatarUrl ?? ""} alt={data.user.displayName} />
            </div>

            <div className="profile-hero__summary">
              <h1 className="profile-hero__name">{data.user.displayName}</h1>
              <div className="profile-hero__meta">
                <span className="profile-pill profile-pill--teal">Уровень {data.user.level}</span>
                <span className="profile-pill profile-pill--orange">{data.user.streakDays} дней подряд</span>
                <span className="profile-contact">
                  <span className="profile-contact__icon" />
                  {data.user.email}
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
              <p className="profile-about__text">{data.user.bio}</p>

              <div className="profile-about__meta">
                <div className="profile-about__row">
                  <span>Регистрация</span>
                  <strong>{formatLongDate(data.user.registeredAt)}</strong>
                </div>
                <div className="profile-about__row">
                  <span>Любимый жанр</span>
                  <strong className="profile-about__accent">{data.user.favoriteGenre}</strong>
                </div>
              </div>
            </article>

            <div className="profile-stats">
              {data.stats.map((item, index) => (
                <article key={item.label} className="profile-stat-card">
                  <div className={`profile-stat-card__icon profile-stat-card__icon--${statDecor[index]?.tone ?? "teal"}`}>
                    <AppIcon
                      name={(statDecor[index]?.icon ?? "book") as "book" | "clock" | "pen" | "bolt"}
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
                  Смотреть все ({data.achievements.length})
                </button>
              </div>

              <div className="profile-achievements">
                {data.achievements.map((item) => (
                  <article key={item.id} className={`achievement-card achievement-card--${item.tone}`}>
                    <div className="achievement-card__icon">
                      <AppIcon
                        name={item.icon as "shield" | "star" | "ribbon" | "lock"}
                        className="profile-glyph"
                      />
                    </div>
                    <div className="achievement-card__body">
                      <div className="achievement-card__title-row">
                        <h3 className="achievement-card__title">{item.title}</h3>
                        {item.badge ? <span className="achievement-card__badge">{item.badge}</span> : null}
                      </div>
                      {item.subtitle ? <p className="achievement-card__text">{item.subtitle}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="profile-card profile-activity">
              <div className="profile-section-head">
                <h2 className="profile-card__title">История активности</h2>
                <div className="profile-counter">Всего действий: {data.activity.length}</div>
              </div>

              <div className="activity-log">
                {data.activity.map((item) => (
                  <div key={item.id} className="activity-log__row">
                    <div
                      className={`activity-log__icon activity-log__icon--${
                        item.type === "comment" ? "blue" : item.type === "favorite" ? "red" : item.type === "complete" ? "green" : "teal"
                      }`}
                    >
                      <AppIcon
                        name={(item.type === "comment" ? "comment" : item.type === "favorite" ? "heart" : item.type === "complete" ? "check" : "book") as "book" | "comment" | "heart" | "check"}
                        className="profile-glyph"
                      />
                    </div>
                    <div className="activity-log__body">
                      <div className="activity-log__top">
                        <p className="activity-log__text">{item.text}</p>
                        <span className="activity-log__time">{formatRelativeDate(item.createdAt)}</span>
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
