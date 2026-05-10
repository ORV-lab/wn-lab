import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { formatLongDate } from "@/lib/time";
import type { TermsResponse } from "@/lib/types";

type TermsShellProps = {
  data: TermsResponse;
};

export function TermsShell({ data }: TermsShellProps) {
  return (
    <main className="info-page">
      <section className="site-shell site-shell--info">
        <SiteHeader active="none" />

        <section className="info-content">
          <p className="info-eyebrow">Документы</p>
          <h1 className="info-title">{data.document.title}</h1>
          <p className="info-text">
            Версия {data.document.version}. Последнее обновление{" "}
            {data.document.updatedAt ? formatLongDate(data.document.updatedAt) : "ещё не опубликовано"}.
          </p>

          <div className="info-grid">
            <article className="info-card">
              <h2 className="info-card__title">Текущая редакция</h2>
              <p className="info-card__text">{data.document.content}</p>
            </article>

            <article className="info-card">
              <h2 className="info-card__title">Статус</h2>
              <p className="info-card__text">
                Документ уже приходит с backend и готов к замене на финальную юридическую версию без изменений во frontend.
              </p>
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
