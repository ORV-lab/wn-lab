export type CatalogBook = {
  id: number;
  title: string;
  author: string;
  tag: string;
  cover: string;
  href: string;
};

const sharedCover =
  "https://www.figma.com/api/mcp/asset/a3b84a9f-044f-430d-bd34-c9b571ba1253";

export const catalogBooks: CatalogBook[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 800,
  title: `Архивный Файл #${800 + index}`,
  author: "ИИ Переводчик",
  tag: "ИИ-Перевод",
  cover: sharedCover,
  href: "/catalog/neuromant",
}));
