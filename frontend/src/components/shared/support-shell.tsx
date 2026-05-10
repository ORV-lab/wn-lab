import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export function SupportShell() {
  return (
    <main className="info-page">
      <section className="site-shell site-shell--info">
        <SiteHeader active="none" />

        <section className="info-content">
          <p className="info-eyebrow">Поддержка</p>
          <h1 className="info-title">Связь с командой проекта</h1>
          <p className="info-text">
            Эта страница подготовлена как точка для будущей пользовательской поддержки.
            Здесь будут размещены обращения по жалобам, ошибкам, блокировкам, доступу к
            контенту и другим вопросам по работе WN-Lab.
          </p>

          <div className="info-grid">
            <article className="info-card">
              <h2 className="info-card__title">Что сюда войдет позже</h2>
              <p className="info-card__text">
                Форма обращения, категории жалоб, история заявок и базовый SLA по ответам.
              </p>
            </article>

            <article className="info-card">
              <h2 className="info-card__title">Текущий статус</h2>
              <p className="info-card__text">
                Раздел находится в разработке. Пока контактная логика не подключена к backend.
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
