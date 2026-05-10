"use client";

import { useState, useTransition } from "react";
import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { markAllNotificationsRead } from "@/lib/api";
import { formatRelativeDate } from "@/lib/time";
import type { NotificationsResponse } from "@/lib/types";

type NotificationsShellProps = {
  initialData: NotificationsResponse;
};

function notificationTone(type: string) {
  switch (type) {
    case "new_chapter":
      return "teal";
    case "system":
      return "amber";
    case "achievement":
      return "gold";
    default:
      return "blue";
  }
}

function notificationIcon(type: string) {
  switch (type) {
    case "new_chapter":
      return "book";
    case "system":
      return "bell";
    case "achievement":
      return "star";
    default:
      return "message";
  }
}

export function NotificationsShell({ initialData }: NotificationsShellProps) {
  const [items, setItems] = useState(initialData.items);
  const [isPending, startTransition] = useTransition();

  return (
    <main className="notifications-page">
      <section className="site-shell site-shell--detail">
        <SiteHeader active="none" />

        <section className="notifications-content">
          <div className="notifications-head">
            <h1 className="notifications-head__title">Уведомления</h1>
            <button
              className="notifications-head__action"
              type="button"
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  try {
                    await markAllNotificationsRead();
                    setItems((current) => current.map((item) => ({ ...item, isRead: true })));
                  } catch {
                    return;
                  }
                });
              }}
            >
              Отметить все как прочитанные
            </button>
          </div>

          <div className="notifications-list">
            {items.map((item) => {
              const tone = notificationTone(item.type);
              const icon = notificationIcon(item.type);

              return (
                <article
                  key={item.id}
                  className={
                    !item.isRead
                      ? `notification-card notification-card--${tone} notification-card--unread`
                      : `notification-card notification-card--${tone}`
                  }
                >
                  <div className={`notification-card__icon-wrap notification-card__icon-wrap--${tone}`}>
                    <AppIcon
                      name={icon as "book" | "bell" | "star" | "message"}
                      className="notification-card__icon"
                    />
                  </div>

                  <div className="notification-card__body">
                    <div className="notification-card__top">
                      <h2 className="notification-card__title">{item.title}</h2>
                      <div className="notification-card__meta">
                        <p className="notification-card__time">{formatRelativeDate(item.createdAt)}</p>
                        {!item.isRead ? <span className="notification-card__dot" /> : null}
                      </div>
                    </div>
                    <p className="notification-card__text">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="notifications-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
