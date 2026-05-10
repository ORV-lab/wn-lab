"use client";

import { useState, useTransition } from "react";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { createSupportTicket } from "@/lib/api";
import type { SupportPageResponse, SupportTicket } from "@/lib/types";

type SupportShellProps = {
  data: SupportPageResponse;
};

export function SupportShell({ data }: SupportShellProps) {
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [type, setType] = useState<string>(data.ticketTypes[0]?.value ?? "other");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(" ");
  const [isPending, startTransition] = useTransition();

  return (
    <main className="info-page">
      <section className="site-shell site-shell--info">
        <SiteHeader active="none" />

        <section className="info-content">
          <p className="info-eyebrow">{data.page.eyebrow}</p>
          <h1 className="info-title">{data.page.title}</h1>
          <p className="info-text">{data.page.description}</p>

          <div className="info-grid">
            <article className="info-card">
              <h2 className="info-card__title">Каналы связи</h2>
              <p className="info-card__text">{data.contact.note}</p>
              <p className="info-card__text">{data.contact.email}</p>
            </article>

            <article className="info-card">
              <h2 className="info-card__title">Текущий статус</h2>
              <p className="info-card__text">{data.status.note}</p>
            </article>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <h2 className="info-card__title">Новое обращение</h2>
              <select value={type} onChange={(event) => setType(event.target.value)}>
                {data.ticketTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Тема" />
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Опишите ситуацию" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email для ответа" />
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    try {
                      const created = (await createSupportTicket({
                        type,
                        subject,
                        message,
                        email: email || null,
                      })) as SupportTicket;
                      setTicket(created);
                      setStatus("Обращение отправлено");
                      setSubject("");
                      setMessage("");
                    } catch {
                      setStatus("Не удалось отправить обращение");
                    }
                  });
                }}
              >
                Отправить
              </button>
              <p>{status}</p>
            </article>

            <article className="info-card">
              <h2 className="info-card__title">Последний тикет</h2>
              {ticket ? (
                <p className="info-card__text">
                  {ticket.subject} · {ticket.status} · {ticket.id}
                </p>
              ) : (
                <p className="info-card__text">Обращений в этой сессии пока нет.</p>
              )}
            </article>
          </div>
        </section>

        <div className="info-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
