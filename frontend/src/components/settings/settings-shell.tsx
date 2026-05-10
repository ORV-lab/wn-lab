"use client";

import { useState, useTransition } from "react";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { saveSettings } from "@/lib/api";
import type { ReaderSettings } from "@/lib/types";

type SettingsShellProps = {
  initialSettings: ReaderSettings;
};

const fonts: ReaderSettings["defaultFont"][] = ["Inter", "Newsreader", "Tinos", "Noto Sans"];

export function SettingsShell({ initialSettings }: SettingsShellProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState(" ");
  const [isPending, startTransition] = useTransition();

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
                  <p className="settings-row__text">Выберите шрифт, который будет использоваться в ридере</p>
                </div>
                <select
                  className="settings-select settings-select--wide"
                  value={settings.defaultFont}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      defaultFont: event.target.value as ReaderSettings["defaultFont"],
                    }))
                  }
                >
                  {fonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="settings-row">
                <div className="settings-row__content">
                  <h3 className="settings-row__title">Размер текста по умолчанию</h3>
                  <p className="settings-row__text">Базовый размер шрифта для чтения</p>
                </div>
                <input
                  className="settings-select settings-select--small"
                  type="number"
                  min={12}
                  max={28}
                  value={settings.fontSize}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      fontSize: Number(event.target.value),
                    }))
                  }
                />
              </div>

              <div className="settings-row">
                <div className="settings-row__content">
                  <h3 className="settings-row__title">Скролл или страницы</h3>
                  <p className="settings-row__text">Режим перелистывания глав</p>
                </div>
                <div className="settings-segmented">
                  <button
                    className={
                      settings.readingMode === "scroll"
                        ? "settings-segmented__option settings-segmented__option--active"
                        : "settings-segmented__option"
                    }
                    type="button"
                    onClick={() => setSettings((current) => ({ ...current, readingMode: "scroll" }))}
                  >
                    Бесконечный скролл
                  </button>
                  <button
                    className={
                      settings.readingMode === "paged"
                        ? "settings-segmented__option settings-segmented__option--active"
                        : "settings-segmented__option"
                    }
                    type="button"
                    onClick={() => setSettings((current) => ({ ...current, readingMode: "paged" }))}
                  >
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
                <button
                  className="settings-toggle"
                  type="button"
                  aria-label="Переключить email-рассылку"
                  onClick={() =>
                    setSettings((current) => ({
                      ...current,
                      emailNotifications: !current.emailNotifications,
                    }))
                  }
                >
                  <span className="settings-toggle__thumb" />
                </button>
              </div>
            </section>
          </div>

          <div className="settings-actions">
            <button
              className="settings-save"
              type="button"
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  try {
                    await saveSettings(settings);
                    setStatus("Сохранено");
                  } catch {
                    setStatus("Ошибка сохранения");
                  }
                });
              }}
            >
              <span className="settings-save__icon" />
              Сохранить изменения
            </button>
            <span>{status}</span>
          </div>
        </section>

        <div className="settings-footer-wrap">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
