export type ContinueReadingItem = {
  id: number;
  title: string;
  chapter: string;
  progress: number;
  cover: string;
};

export type PopularItem = {
  id: number;
  title: string;
  author: string;
  cover: string;
  badge: string;
};

export type UpdateItem = {
  id: number;
  title: string;
  cover: string;
  chapter: string;
  when: string;
};

export const navigation = [
  { label: "Главная", active: true },
  { label: "Каталог", active: false },
  { label: "ИИ-Перевод", active: false },
  { label: "Моя библиотека", active: false },
] as const;

export const continueReading: ContinueReadingItem[] = [
  {
    id: 1,
    title: "Нейромант",
    chapter: "Глава 14: Орбита",
    progress: 68,
    cover: "https://www.figma.com/api/mcp/asset/b4bbc4a0-0010-4092-b36d-6e485b867306",
  },
  {
    id: 2,
    title: "Дюна",
    chapter: "Глава 2: Арракин",
    progress: 58,
    cover: "https://www.figma.com/api/mcp/asset/93a4e1f2-f8bd-4eb5-8b34-a727306836bf",
  },
  {
    id: 3,
    title: "Ложная слепота",
    chapter: "Глава 5: Гипсопея",
    progress: 12,
    cover: "https://www.figma.com/api/mcp/asset/2bee1a77-ba29-4ea5-b883-0418444de376",
  },
  {
    id: 4,
    title: "Лавина",
    chapter: "Глава 2",
    progress: 9,
    cover: "https://www.figma.com/api/mcp/asset/821cec10-78ec-4d07-b29c-c90eadf9638b",
  },
];

export const popularThisWeek: PopularItem[] = [
  {
    id: 1,
    title: "Нейромант",
    author: "Уильям Гибсон",
    badge: "4.8",
    cover: "https://www.figma.com/api/mcp/asset/b4bbc4a0-0010-4092-b36d-6e485b867306",
  },
  {
    id: 2,
    title: "Дюна",
    author: "Фрэнк Герберт",
    badge: "4.9",
    cover: "https://www.figma.com/api/mcp/asset/93a4e1f2-f8bd-4eb5-8b34-a727306836bf",
  },
  {
    id: 3,
    title: "Основание",
    author: "Айзек Азимов",
    badge: "4.7",
    cover: "https://www.figma.com/api/mcp/asset/a6cc7a3c-1df1-4d92-a6ea-d5c4f30bd598",
  },
  {
    id: 4,
    title: "1984",
    author: "Джордж Оруэлл",
    badge: "4.9",
    cover: "https://www.figma.com/api/mcp/asset/80046332-6037-4fde-be97-830e21aa5921",
  },
  {
    id: 5,
    title: "Гиперион",
    author: "Дэн Симмонс",
    badge: "4.6",
    cover: "https://www.figma.com/api/mcp/asset/d7e3770b-3e34-4639-a53d-2ec57e08a4ff",
  },
  {
    id: 6,
    title: "Снеговик",
    author: "Ю Несбё",
    badge: "4.5",
    cover: "https://www.figma.com/api/mcp/asset/569bd51d-b4c7-4950-9317-ffcdab2f6243",
  },
];

export const latestUpdates: UpdateItem[] = [
  {
    id: 1,
    title: "Задача трех тел",
    chapter: "Глава 12",
    when: "2 часа назад",
    cover: "https://www.figma.com/api/mcp/asset/404f92af-7829-4785-a722-46fe64d5024a",
  },
  {
    id: 2,
    title: "Мечтают ли андроиды об электроовцах?",
    chapter: "Глава 8",
    when: "5 часов назад",
    cover: "https://www.figma.com/api/mcp/asset/61152887-a879-4195-9258-78a633f1769c",
  },
  {
    id: 3,
    title: "Гиперион",
    chapter: "Глава 24",
    when: "Вчера",
    cover: "https://www.figma.com/api/mcp/asset/297cf4bf-578f-4dbc-82ec-fa5f35630fc4",
  },
  {
    id: 4,
    title: "О дивный новый мир",
    chapter: "Глава 15",
    when: "Вчера",
    cover: "https://www.figma.com/api/mcp/asset/ca0b2f10-42db-4177-9900-7bea11da5266",
  },
  {
    id: 5,
    title: "Марсианин",
    chapter: "Глава 3",
    when: "Вчера",
    cover: "https://www.figma.com/api/mcp/asset/7ea7c13b-ce8b-4cfb-adc4-5513c12c8f37",
  },
  {
    id: 6,
    title: "Акира",
    chapter: "Том 1",
    when: "2 дня назад",
    cover: "https://www.figma.com/api/mcp/asset/4b9f5d33-355c-43f1-80d2-04820049e9e3",
  },
];

export const cyberpunkCollection = {
  eyebrow: "Тематическая подборка",
  title: "Золотой век киберпанка",
  description:
    "Коллекция произведений, заложивших основы жанра. От классических романов до редких малоизвестных архивов.",
  cover: "https://www.figma.com/api/mcp/asset/710c8a35-18ba-41c0-bead-6ec3fe77561d",
};
