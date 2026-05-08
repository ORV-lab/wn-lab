import type { BookItem } from "@/data/mock-library";

type BookCardProps = {
  book: BookItem;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="book-cover" style={{ background: book.accent }}>
        <div className="book-cover__glow" />
        <span className="book-cover__title">{book.title}</span>
      </div>

      <div className="book-meta">
        <div>
          <p className="book-title">{book.title}</p>
          <p className="book-author">{book.author}</p>
        </div>

        <p className="book-blurb">{book.blurb}</p>

        <div className="book-progress">
          <div className="book-progress__label-row">
            <span>Прогресс</span>
            <span>{book.progress}%</span>
          </div>
          <div className="book-progress__track">
            <div
              className="book-progress__fill"
              style={{ width: `${book.progress}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
