import Link from "next/link";
import { AppIcon } from "@/components/shared/app-icon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__intro">
          <div className="brand">
            <span className="brand__mark">
              <span className="brand__mark-inner" />
            </span>
            <span className="brand__label">WN-Lab</span>
          </div>
          <p className="site-footer__text">
            Платформа для чтения с ИИ-переводом.
            <br />
            Открывайте новые миры без языковых барьеров.
          </p>

          <div className="site-footer__socials">
            <button className="site-footer__social" type="button" aria-label="Контактная почта WN-Lab">
              <AppIcon name="mail" className="site-footer__social-icon" />
            </button>
          </div>
        </div>

        <div className="site-footer__group">
          <p className="site-footer__heading">Навигация</p>
          <div className="site-footer__stack">
            <Link href="/catalog" className="site-footer__link">
              Каталог
            </Link>
            <Link href="/translate" className="site-footer__link">
              ИИ-Перевод
            </Link>
            <Link href="/library" className="site-footer__link">
              Моя библиотека
            </Link>
          </div>
        </div>

        <div className="site-footer__group">
          <p className="site-footer__heading">Аккаунт</p>
          <div className="site-footer__stack">
            <Link href="/profile" className="site-footer__link">
              Профиль
            </Link>
            <Link href="/settings" className="site-footer__link">
              Настройки
            </Link>
            <Link href="/notifications" className="site-footer__link">
              Уведомления
            </Link>
          </div>
        </div>

        <div className="site-footer__group">
          <p className="site-footer__heading">Проект</p>
          <div className="site-footer__stack">
            <Link href="/support" className="site-footer__link">
              Поддержка
            </Link>
            <Link href="/terms" className="site-footer__link">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__copyright">© 2026 WN-Lab. Все права защищены.</p>
        <p className="site-footer__note">
          Сделано со <span className="site-footer__heart">♥</span> для читателей
        </p>
      </div>
    </footer>
  );
}
