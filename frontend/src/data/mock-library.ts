export type BookStatus = "Читаю" | "Избранное" | "Прочитано";

export type BookItem = {
  id: number;
  title: string;
  author: string;
  progress: number;
  status: BookStatus;
  accent: string;
  blurb: string;
};

export const tabs = ["Все проекты", "Читаю", "Избранное", "Прочитано"] as const;

export const books: BookItem[] = [
  {
    id: 1,
    title: "Нейромант",
    author: "Уильям Гибсон",
    progress: 66,
    status: "Читаю",
    accent: "linear-gradient(180deg, #7c3aed 0%, #1f1636 100%)",
    blurb: "Культовый киберпанк о сети, памяти и цифровой идентичности.",
  },
  {
    id: 2,
    title: "Дюна",
    author: "Фрэнк Герберт",
    progress: 100,
    status: "Прочитано",
    accent: "linear-gradient(180deg, #f59e0b 0%, #40210f 100%)",
    blurb: "Эпическая сага о власти, судьбе и мире Арракиса.",
  },
  {
    id: 3,
    title: "Основание",
    author: "Айзек Азимов",
    progress: 0,
    status: "Избранное",
    accent: "linear-gradient(180deg, #38bdf8 0%, #102133 100%)",
    blurb: "Цикл о науке, цивилизации и попытке предсказать историю.",
  },
];
