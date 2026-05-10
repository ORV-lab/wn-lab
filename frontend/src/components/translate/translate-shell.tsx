"use client";

import { useState, useTransition } from "react";
import { AppIcon } from "@/components/shared/app-icon";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { createTranslationJob } from "@/lib/api";
import { formatRelativeDate } from "@/lib/time";
import type { TranslationDashboardResponse, TranslationJob } from "@/lib/types";

type TranslateShellProps = {
  initialData: TranslationDashboardResponse;
};

const translateHero =
  "https://www.figma.com/api/mcp/asset/40beacef-3d65-4f0b-8fdc-01b706b8c542";

export function TranslateShell({ initialData }: TranslateShellProps) {
  const [data, setData] = useState(initialData);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("KR");
  const [targetLanguage, setTargetLanguage] = useState("RU");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState(" ");
  const [isPending, startTransition] = useTransition();

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
              {data.engine.name} v{data.engine.version}
            </span>
            <h1 className="translate-hero__title">ИИ-Переводчик</h1>
            <p className="translate-hero__text">
              Адаптивный художественный перевод новелл с сохранением авторского стиля и контекста.
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
                    <input className="translate-field__input" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Например: Heaven Official's Blessing" />
                  </label>

                  <label className="translate-field">
                    <span className="translate-field__label">Автор (опционально)</span>
                    <input className="translate-field__input" type="text" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Имя автора" />
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
                    <select className="translate-select" value={sourceLanguage} onChange={(event) => setSourceLanguage(event.target.value)}>
                      <option value="KR">Корейский</option>
                      <option value="EN">Английский</option>
                      <option value="CN">Китайский</option>
                      <option value="JP">Японский</option>
                    </select>
                  </label>

                  <label className="translate-field">
                    <span className="translate-field__label">На какой язык?</span>
                    <select className="translate-select" value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value)}>
                      <option value="RU">Русский</option>
                      <option value="EN">Английский</option>
                    </select>
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
                <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
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
                <span>Задача</span>
                <span>Прогресс</span>
                <span>Статус</span>
              </div>

              <div className="translate-queue__rows">
                {data.queue.map((item) => (
                  <div key={item.id} className="translate-queue__row">
                    <div className="translate-queue__user">
                      <span className="translate-queue__avatar">{item.title[0].toUpperCase()}</span>
                      <div>
                        <p className="translate-queue__user-name">{item.title}</p>
                        <p className="translate-queue__user-file">{item.fileName}</p>
                      </div>
                    </div>

                    <div className="translate-queue__progress">
                      <div className="translate-queue__progress-track">
                        <div className="translate-queue__progress-fill" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="translate-queue__progress-label">{item.progress}%</span>
                    </div>

                    <span className="translate-queue__status">
                      {item.queuePosition ? `#${item.queuePosition}` : item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="translate-queue__footer">
                <AppIcon name="clock" className="translate-queue__footer-icon" />
                Ожидаемое время обработки: ~{(data.serverStatus.averageWaitSeconds / 60).toFixed(1)} мин
              </div>
            </article>

            <article className="translate-card translate-launch">
              <div className="translate-launch__note">
                <AppIcon name="clock" className="translate-launch__note-icon" />
                Время обработки зависит от объёма текста
              </div>

              <button
                className="translate-launch__button"
                type="button"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    if (!title || !file) {
                      setStatus("Заполните название и выберите файл");
                      return;
                    }

                    const formData = new FormData();
                    formData.set("title", title);
                    formData.set("author", author);
                    formData.set("sourceLanguage", sourceLanguage);
                    formData.set("targetLanguage", targetLanguage);
                    formData.set("file", file);

                    try {
                      const job = (await createTranslationJob(formData)) as TranslationJob;
                      setData((current) => ({ ...current, queue: [job, ...current.queue] }));
                      setTitle("");
                      setAuthor("");
                      setFile(null);
                      setStatus("Задача добавлена в очередь");
                    } catch {
                      setStatus("Не удалось создать задачу");
                    }
                  });
                }}
              >
                <AppIcon name="bolt" className="translate-launch__button-icon" />
                Начать перевод
              </button>
              <p>{status}</p>
            </article>
          </div>

          <aside className="translate-sidebar">
            <article className="translate-card translate-history">
              <div className="translate-card__title-row">
                <AppIcon name="history" className="translate-card__icon translate-card__icon-tone--text" />
                <h2 className="translate-card__title translate-card__title--small">История переводов</h2>
              </div>

              <div className="translate-history__list">
                {data.history.map((item) => (
                  <div key={item.id} className="translate-history__item">
                    <div className="translate-history__item-icon">
                      <AppIcon name="history" className="translate-history__doc-icon" />
                    </div>
                    <div className="translate-history__item-body">
                      <p className="translate-history__item-title">{item.title}</p>
                      <div className="translate-history__item-meta">
                        <span>{item.sourceLanguage} → {item.targetLanguage}</span>
                        <span>{formatRelativeDate(item.createdAt)}</span>
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
                <h2 className="translate-card__title translate-card__title--small">Статус серверов</h2>
              </div>

              <div className="translate-status__rows">
                <div className="translate-status__row">
                  <span>Активные ноды</span>
                  <strong className="translate-status__value translate-status__value--accent">
                    {data.serverStatus.activeNodes}/{data.serverStatus.totalNodes}
                  </strong>
                </div>
                <div className="translate-status__row">
                  <span>Глобальная очередь</span>
                  <strong className="translate-status__value">{data.serverStatus.queuedFiles} файлов</strong>
                </div>
                <div className="translate-status__row">
                  <span>Среднее ожидание</span>
                  <strong className="translate-status__value">{(data.serverStatus.averageWaitSeconds / 60).toFixed(1)} мин</strong>
                </div>
              </div>

              <div className="translate-status__pro">
                <div className="translate-status__pro-head">
                  <AppIcon name="bolt" className="translate-status__pro-icon" />
                  <span>{data.userPlan.name.toUpperCase()}-статус</span>
                </div>
                <p className="translate-status__pro-text">
                  {data.userPlan.hasPriorityQueue
                    ? "Приоритетный доступ к нейросетям уже активен."
                    : "Улучшите аккаунт, чтобы получить приоритетную очередь."}
                </p>
                <button className="translate-status__pro-button" type="button">
                  Управление тарифом
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
