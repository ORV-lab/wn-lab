import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export function TermsShell() {
  return (
    <main className="info-page">
      <section className="site-shell site-shell--info">
        <SiteHeader active="none" />

        <section className="info-content">
          <p className="info-eyebrow">Документы</p>
          <h1 className="info-title">Пользовательское соглашение</h1>
          <p className="info-text">
            Здесь будет размещена официальная версия пользовательского соглашения WN-Lab.
            На текущем этапе страница подготовлена как часть структуры проекта и будет
            заполнена после утверждения юридического текста.
          </p>

          <div className="info-grid">
            <article className="info-card">
              <h2 className="info-card__title">Что появится на странице</h2>
              <p className="info-card__text">
                Условия использования платформы, правила доступа к материалам и порядок
                взаимодействия с пользовательским контентом.
              </p>
            </article>

            <article className="info-card">
              <h2 className="info-card__title">Текущий статус</h2>
              <p className="info-card__text">
                Юридический текст еще не опубликован. Сейчас это подготовленный route под
                будущий финальный документ.
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
