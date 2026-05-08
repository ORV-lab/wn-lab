import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export function SettingsShell() {
  return (
    <main className="settings-page">
      <section className="site-shell site-shell--settings">
        <SiteHeader active="none" />

        <section className="settings-content">
          <h1 className="settings-title">Настройки приложения</h1>

          <div className="settings-sections">
            <section className="settings-section">
              <h2 className="settings-section__title">Чтение</h2>

              <div className="settings-row">
                <div className="settings-row__content">
                  <h3 className="settings-row__title">Шрифт по умолчанию</h3>
                  <p className="settings-row__text">
                    Выберите шрифт, который будет использоваться в ридере
                  </p>
                </div>
                <button className="settings-select settings-select--wide" type="button">
                  Inter
                  <span className="settings-select__caret" />
                </button>
              </div>

              <div className="settings-row">
                <div className="settings-row__content">
                  <h3 className="settings-row__title">Размер текста по умолчанию</h3>
                  <p className="settings-row__text">Базовый размер шрифта для чтения</p>
                </div>
                <button className="settings-select settings-select--small" type="button">
                  18 px
                  <span className="settings-select__caret" />
                </button>
              </div>

              <div className="settings-row">
                <div className="settings-row__content">
                  <h3 className="settings-row__title">Скролл или страницы</h3>
                  <p className="settings-row__text">Режим перелистывания глав</p>
                </div>
                <div className="settings-segmented">
                  <button className="settings-segmented__option settings-segmented__option--active" type="button">
                    Бесконечный скролл
                  </button>
                  <button className="settings-segmented__option" type="button">
                    Постранично
                  </button>
                </div>
              </div>
            </section>

            <section className="settings-section">
              <h2 className="settings-section__title">Уведомления</h2>

              <div className="settings-row">
                <div className="settings-row__content">
                  <h3 className="settings-row__title">Email-рассылка</h3>
                  <p className="settings-row__text">Получать обновления на почту</p>
                </div>
                <button className="settings-toggle" type="button" aria-label="Переключить email-рассылку">
                  <span className="settings-toggle__thumb" />
                </button>
              </div>
            </section>
          </div>

          <div className="settings-actions">
            <button className="settings-save" type="button">
              <span className="settings-save__icon" />
              Сохранить изменения
            </button>
          </div>
        </section>

        <div className="settings-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
