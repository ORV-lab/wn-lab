import { BookCard } from "@/components/home/book-card";
import { books, tabs } from "@/data/mock-library";

export function LibraryShell() {
  return (
    <main className="library-page">
      <div className="library-page__backdrop library-page__backdrop--left" />
      <div className="library-page__backdrop library-page__backdrop--right" />

      <section className="library-shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand__mark" />
            <span className="brand__label">Archive.io</span>
          </div>

          <nav className="nav">
            <a href="#" className="nav__link">
              Главная
            </a>
            <a href="#" className="nav__link">
              Каталог
            </a>
            <a href="#" className="nav__link nav__link--active">
              Моя библиотека
            </a>
          </nav>
        </header>

        <section className="hero">
          <div>
            <p className="hero__eyebrow">Личная библиотека</p>
            <h1 className="hero__title">
              Ваша коллекция произведений, прогресс чтения и закладки.
            </h1>
            <p className="hero__text">
              Первый экран собран как стартовая версия интерфейса для дальнейшего
              переноса из дизайна. Он уже задает ритм проекта, сетку и UI-основу.
            </p>
          </div>

          <aside className="hero-panel">
            <span className="hero-panel__label">Активно сейчас</span>
            <strong className="hero-panel__title">Нейромант</strong>
            <p className="hero-panel__text">66% прогресса и 4 сохраненные заметки.</p>
          </aside>
        </section>

        <section className="toolbar">
          <div className="tabs" aria-label="Фильтр библиотеки">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={index === 0 ? "tab tab--active" : "tab"}
              >
                {tab}
              </button>
            ))}
          </div>

          <label className="search">
            <span className="search__icon" aria-hidden="true">
              ⌕
            </span>
            <input
              className="search__input"
              type="text"
              placeholder="Поиск в библиотеке..."
            />
          </label>
        </section>

        <section className="content-grid">
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <aside className="summary-card">
            <p className="summary-card__label">Сводка</p>
            <div className="summary-card__metric">
              <span>3</span>
              <p>книги в текущей коллекции</p>
            </div>
            <div className="summary-card__metric">
              <span>1</span>
              <p>активное чтение прямо сейчас</p>
            </div>
            <div className="summary-card__metric">
              <span>2</span>
              <p>произведения ждут следующей сессии</p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
