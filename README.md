<div align="center">

# 📖 Wn-Lab

**Веб-платформа для автоматизированного перевода веб-новелл с помощью ИИ**

![Status](https://img.shields.io/badge/Status-Active%20Development-success?style=flat-square)

### Tech Stack

| Component | Tech | Version |
|-----------|------|---------|
| **Backend API** | ![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go) | [![Echo](https://img.shields.io/badge/Echo-v4-00ADD8?style=flat)](https://echo.labstack.com/) |
| **Frontend** | ![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react) | [![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/) |
| **UI Library** | ![shadcn](https://img.shields.io/badge/shadcn%2Fui-Radix-000?style=flat) | [![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/) |
| **Database** | [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql)](https://www.postgresql.org/) | [![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat&logo=redis)](https://redis.io/) |
| **Search** | [![Meilisearch](https://img.shields.io/badge/Meilisearch-1.7-FF5C67?style=flat&logo=meilisearch)](https://www.meilisearch.com/) |
| **DevTools** | [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/) | [![ESLint](https://img.shields.io/badge/ESLint-9.32-4B3B8A?style=flat&logo=eslint)](https://eslint.org/) |

</div>

---

## 🎯 О проекте

**Wn-Lab** создан с одной амбициозной целью: **сократить время выпуска одной переведенной главы веб-новеллы с нескольких часов до 15–30 минут**, сохраняя при этом высокое качество, согласованность и литературный стиль.

### Зачем мы это делаем?
Сообщества переводчиков-энтузиастов ежедневно сталкиваются с огромными объемами текста, сложной специфической терминологией и длительным процессом ручного перевода. Мы предлагаем решение, при котором рутинную работу выполняет искусственный интеллект (современные LLM, такие как Claude 3.5 Sonnet и Gemini 2.5 Flash), а переводчик становится **редактором**, который шлифует итоговый результат.

### Как это работает:
1. **Загрузка**: Переводчик загружает оригинальную главу.
2. **ИИ-Перевод**: Специализированный Writer Worker(Go) разбирает текст, подтягивает глоссарий для сохранения консистентности имен/терминов и отправляет чанки провайдеру ИИ.
3. **Редактура**: Текст возвращается в удобный браузерный diff-редактор, где переводчик правит черновик.
4. **Публикация**: Глава мгновенно становится доступной в удобной, красивой и быстроработающей SEO-оптимизированной читалке.

---

## ✨ Ключевые возможности

* **Полный пайплайн перевода (Translation Pipeline)**
  * Асинхронные задачи обработки текстов через Redis Queue.
  * Автоматический fallback между AI-провайдерами (напр. от Claude к Gemini).
* **Глоссарии**
  * Интеллектуальная система терминов (персонажи, навыки, локации), которая гарантированно применяется ИИ при адаптации текста.
* **Продвинутый редактор (Post-Editing)**
  * Удобное разделение "Оригинал / Перевод", inline-правки и возможность «перегенерации» конкретных абзацев на лету.
* **Читалка мирового класса**
  * Разработанная на Next.js с поддержкой SSG/ISR для мгновенной загрузки и SEO. 
  * Настройки тем (светлая/темная/сепия), размеров шрифта и сохранение прогресса.
* **Функционал сообщества**
  * Ролевая модель: `Reader` (Чтение, комментирование), `Translator` (Перевод, глоссарии), `Admin`.
* **Умный поиск**
  * Интеграция с Meilisearch для мгновенного fuzzy-поиска по жанрам, авторам и названиям.

---

## 🏗 Архитектура

Проект построен по принципам современной микросервисной (и монорепозиторной) разработки.

### Компоненты системы

| Слой | Технология | Назначение |
|------|-----------|-----------|
| **Frontend** | React 18 + Vite + TypeScript | Быстрая SPA с современным DX, реактивный интерфейс для редакторов и читателей |
| **Backend API** | Go + Echo v4 + PostgreSQL | REST API для управления новеллами, главами, глоссариями и аутентификацией |
| **Background Worker** | Go + Redis | Асинхронная обработка переводов, интеграция с LLM провайдерами |
| **Поиск** | Meilisearch | Быстрый fuzzy-поиск по новеллам, жанрам, авторам |
| **Кеширование** | Redis | Очереди, сессионные данные, кеш |
| **Хранилище** | PostgreSQL 16 | Реляционная БД для всех доменных сущностей |

### Frontend архитектура

```
React 18.3          → Modern hooks & concurrent features
     ↓
Vite 5.4            → Lightning-fast bundling & HMR
     ↓
React Router 6      → Client-side navigation & lazy loading
     ↓
TanStack Query      → Powerful data fetching & synchronization
     ↓
shadcn/ui           → Accessible, composable components
     ↓
Tailwind CSS        → Utility-first styling framework
     ↓
TypeScript 5.8      → Type safety across the application
```


---

## 📂 Структура проекта

<details open>
<summary><b>Развернуть структуру</b></summary>

```
wn-lab/
├── docker-compose.yml          # Инфраструктура: PostgreSQL, Redis, Meilisearch
├── Makefile                    # CLI команды: dev, migrate, test, build
├── README.md                   # Этот файл
│
├── backend/                    # 🐹 Go backend с API и Worker
│   ├── cmd/
│   │   ├── api/                # REST API сервер (Echo)
│   │   ├── worker/             # Фоновый обработчик переводов
│   │   └── migrate/            # Миграции БД (goose)
│   ├── internal/
│   │   ├── domain/             # Домены: User, Novel, Chapter, Glossary, Job
│   │   ├── handler/            # HTTP контроллеры (auth, novels, chapters)
│   │   ├── service/            # Бизнес-логика
│   │   ├── repository/         # Слой доступа к данным
│   │   ├── middleware/         # JWT auth, RBAC
│   │   └── pkg/                # Утилиты (jwt, storage)
│   ├── migrations/             # SQL миграции
│   ├── go.mod                  # Go зависимости
│   └── Dockerfile.api          # Контейнер для API
│
└── frontend/                   # ⚛️  React + Vite фронтенд
    ├── package.json            # Dependencies: React, Vite, shadcn, TanStack Query
    ├── vite.config.ts          # Vite конфигурация
    ├── tsconfig.json           # TypeScript конфигурация
    ├── tailwind.config.ts      # Tailwind CSS customization
    ├── postcss.config.js       # PostCSS pipeline
    ├── eslint.config.js        # Линтинг правила
    ├── vitest.config.ts        # Unit тестирование
    │
    ├── index.html              # HTML точка входа
    ├── src/
    │   ├── main.tsx            # React entry point
    │   ├── App.tsx             # Root component с Router
    │   │
    │   ├── components/         # Переиспользуемые компоненты
    │   │   ├── ui/             # shadcn/ui компоненты (56+)
    │   │   ├── Navbar.tsx      # Шапка приложения
    │   │   ├── NovelCard.tsx   # Карточка новеллы
    │   │   └── ...
    │   │
    │   ├── pages/              # Page компоненты (раутируются)
    │   │   ├── Home.tsx        # Главная
    │   │   ├── Catalog.tsx     # Каталог новелл
    │   │   ├── Reader.tsx      # Читалка
    │   │   ├── Profile.tsx     # Профиль пользователя
    │   │   └── ...
    │   │
    │   ├── hooks/              # Custom React hooks
    │   │   ├── use-mobile.tsx  # Responsive detection
    │   │   └── use-toast.ts    # Toast notifications
    │   │
    │   ├── lib/                # Утилиты и helpers
    │   │   └── utils.ts        # Классовые утилиты (cn, etc)
    │   │
    │   ├── data/               # Mock данные для разработки
    │   │   └── mockData.ts
    │   │
    │   ├── test/               # Тестовые конфиги
    │   │   └── setup.ts
    │   │
    │   ├── index.css           # Tailwind & базовые стили
    │   └── vite-env.d.ts       # TypeScript для Vite
    │
    ├── public/                 # Статические ассеты
    │   ├── favicon.ico
    │   ├── robots.txt
    │   └── placeholder.svg
    │
    └── .gitignore             # Git исключения
```

</details>

---

## 🚀 Быстрый старт

### Предусловия
- **Node.js** 18+ (для фронтенда)
- **Go** 1.22+ (для бэкенда)
- **Docker & Docker Compose** (для инфраструктуры)

### Локальная разработка

#### 1️⃣ Клонируйте репозиторий и установите зависимости

```bash
# Backend зависимости уже указаны в go.mod
# Frontend зависимости
cd frontend
npm install
```

#### 2️⃣ Запустите инфраструктуру

```bash
# В корневой директории проекта
docker-compose up -d

# Проверить статус
docker-compose ps
```

#### 3️⃣ Выполните миграции БД

```bash
cd backend
go run ./cmd/migrate/main.go
```

#### 4️⃣ Запустите сервисы в режиме разработки

```bash
# Терминал 1: Frontend (порт 5173)
cd frontend
npm run dev

# Терминал 2: API сервер (порт 8080)
cd backend
make api

# Терминал 3 (опционально): Background Worker
cd backend
make worker
```

#### 5️⃣ Откройте браузер

```
http://localhost:5173
```

</details>

---

## 📋 Доступные команды

### Frontend
```bash
npm run dev          # Запустить dev сервер (Vite HMR)
npm run build        # Production билд
npm run lint         # ESLint проверка
npm run test         # Запустить тесты (Vitest)
npm run test:watch  # Тесты в режиме watch
npm run preview     # Preview production билда
```

### Backend
```bash
make api            # Запустить REST API сервер
make worker         # Запустить Background Worker
make migrate-up     # Накатить миграции БД
make test           # Запустить тесты
make build          # Собрать бинарники
```

---

## 🧑‍💻 Development Workflow

### Frontend разработка

Фронтенд использует **Vite** с **HMR** (Hot Module Replacement) для мгновенного обновления при изменении кода.

```bash
cd frontend
npm install      # Установить зависимости
npm run dev      # Запустить dev сервер на http://localhost:5173
```

**Структура компонентов:**
- `src/pages/` — Page components (раутируются через App.tsx)
- `src/components/` — Переиспользуемые компоненты
- `src/components/ui/` — shadcn/ui базовые компоненты (56+ готовых)
- `src/hooks/` — Custom React hooks

### Backend разработка

```bash
cd backend
go mod download   # Загрузить Go зависимости
make api          # API сервер (http://localhost:8080)
make worker       # Background tasks worker
```

**Основные файлы:**
- `cmd/api/main.go` — Entry point REST API
- `internal/domain/` — Доменные модели (Business Logic)
- `internal/handler/` — HTTP контроллеры
- `internal/service/` — Бизнес-логика
- `migrations/` — SQL миграции

---

## 🔐 Аутентификация

Система использует **JWT токены** для аутентификации:

- **Token хранится** в `localStorage` на фронтенде
- **Отправляется** в заголовке `Authorization: Bearer <token>`
- **Выдается** API при успешном логине
- **Валидируется** Go middleware на каждой защищенной route

**Роли:**
- `reader` — Чтение новелл, комментирование
- `translator` — Загрузка глав, работа с редактором
- `admin` — Управление платформой

---

## 📦 Развертывание

### Docker контейнеризация

```bash
# Build и запуск всей системы
docker-compose up -d

# Статус сервисов
docker-compose ps

# Логи конкретного сервиса
docker-compose logs -f api
```

### Production build

```bash
# Frontend
cd frontend && npm run build  # Создаст dist/ папку

# Backend
cd backend && go build -o wn-api ./cmd/api/main.go
```

---

## 🤝 Contributing

Приветствуем любые контрибьюции! Пожалуйста:

1. Создайте feature branch: `git checkout -b feat/amazing-feature`
2. Commit с ясным сообщением: `git commit -m 'feat: add amazing feature'`
3. Push в репозиторий: `git push origin feat/amazing-feature`
4. Откройте Pull Request

**Naming Convention для коммитов:**
- `feat:` — Новая функция
- `fix:` — Исправление ошибки
- `docs:` — Документация
- `style:` — Форматирование кода
- `refactor:` — Переструктурирование
- `test:` — Тесты
- `chore:` — Служебные изменения
- `build:` — Инструменты сборки

---

## 📞 Support

Если у вас есть вопросы или нашли баги:
- Откройте **Issue** на GitHub
- Проверьте **Discussions** в репозитории
- Присоединяйтесь к нашему сообществу

---

<div align="center">

### ⭐ Если проект вам нравится, не забудьте поставить звезду!

[⬆ На главную](#-wn-lab)

</div>

