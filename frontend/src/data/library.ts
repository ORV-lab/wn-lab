export type LibraryCategory = "all" | "reading" | "favorites" | "completed";

export type LibraryBook = {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  href: string;
  categories: LibraryCategory[];
};

export const libraryCategoryMeta: Record<
  LibraryCategory,
  { label: string; href: string; icon: string }
> = {
  all: { label: "Все проекты", href: "/library", icon: "stack" },
  reading: { label: "Читаю", href: "/library/reading", icon: "clock" },
  favorites: { label: "Избранное", href: "/library/favorites", icon: "bookmark" },
  completed: { label: "Прочитано", href: "/library/completed", icon: "check" },
};

export const libraryBooks: LibraryBook[] = [
  {
    id: "neuromant",
    title: "Нейромант",
    author: "Уильям Гибсон",
    cover: "https://www.figma.com/api/mcp/asset/3508123e-8037-4a0d-927e-8cafa775def2",
    progress: 66,
    href: "/catalog/neuromant",
    categories: ["all", "reading", "favorites"],
  },
  {
    id: "dune",
    title: "Дюна",
    author: "Фрэнк Герберт",
    cover: "https://www.figma.com/api/mcp/asset/5fb020e1-d585-4a38-bef4-1a9e2f29dc63",
    progress: 100,
    href: "/catalog",
    categories: ["all", "completed", "favorites"],
  },
  {
    id: "foundation",
    title: "Основание",
    author: "Айзек Азимов",
    cover: "https://www.figma.com/api/mcp/asset/2204b8e6-4628-432f-ae4f-08cc1028fd0e",
    progress: 0,
    href: "/catalog",
    categories: ["all", "reading"],
  },
];
