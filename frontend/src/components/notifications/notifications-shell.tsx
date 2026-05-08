import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

const notifications = [
  {
    id: 1,
    title: "Новая глава",
    body: "Вышла 15 глава «Нейромант». ИИ-перевод уже завершен и доступен для чтения.",
    time: "2 часа назад",
    tone: "teal",
    unread: true,
    icon: "book",
  },
  {
    id: 2,
    title: "Системное уведомление",
    body: "Технические работы на сервере ИИ-перевода завершены. Скорость перевода увеличена на 15%.",
    time: "Вчера",
    tone: "amber",
    unread: true,
    icon: "bell",
  },
  {
    id: 3,
    title: "Новое достижение",
    body: "Вы получили достижение «Книжный червь» за 100 часов непрерывного чтения.",
    time: "3 дня назад",
    tone: "gold",
    unread: false,
    icon: "star",
  },
  {
    id: 4,
    title: "Ответ на комментарий",
    body: "Пользователь CyberPunk2077 ответил на ваш комментарий к книге «Дюна».",
    time: "Неделю назад",
    tone: "blue",
    unread: false,
    icon: "message",
  },
] as const;

export function NotificationsShell() {
  return (
    <main className="notifications-page">
      <section className="site-shell site-shell--detail">
        <SiteHeader active="none" />

        <section className="notifications-content">
          <div className="notifications-head">
            <h1 className="notifications-head__title">Уведомления</h1>
            <button className="notifications-head__action" type="button">
              Отметить все как прочитанные
            </button>
          </div>

          <div className="notifications-list">
            {notifications.map((item) => (
              <article
                key={item.id}
                className={
                  item.unread
                    ? `notification-card notification-card--${item.tone} notification-card--unread`
                    : `notification-card notification-card--${item.tone}`
                }
              >
                <div className={`notification-card__icon-wrap notification-card__icon-wrap--${item.tone}`}>
                  <AppIcon
                    name={item.icon as "book" | "bell" | "star" | "message"}
                    className="notification-card__icon"
                  />
                </div>

                <div className="notification-card__body">
                  <div className="notification-card__top">
                    <h2 className="notification-card__title">{item.title}</h2>
                    <div className="notification-card__meta">
                      <p className="notification-card__time">{item.time}</p>
                      {item.unread ? <span className="notification-card__dot" /> : null}
                    </div>
                  </div>
                  <p className="notification-card__text">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="notifications-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
