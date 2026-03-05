# Wn-lab — Техническое задание

**Версия**: 1.0  
**Дата**: 2026-03-05  
**Статус**: Draft

---

## 1. Обзор проекта

**Wn-lab** — веб-платформа для автоматизированного перевода веб-новелл с помощью LLM.  
Переводчик загружает исходный текст, система переводит его через AI, редактор правит черновик и публикует главу.

### Цели

- Сократить время выпуска одной главы с нескольких часов до 15–30 минут
- Обеспечить консистентность терминологии через глоссарии
- Создать удобную читалку с SEO-оптимизированными страницами

### Не входит в скоуп MVP

- Монетизация / платный доступ к главам
- Мобильное приложение
- Автоматический парсинг исходников с других сайтов

---

## 2. Роли и доступ

| Роль | Регистрация | Возможности |
|---|---|---|
| `reader` | Открытая | Читать опубликованные главы, bookmarks, комментарии |
| `translator` | По инвайту или заявке | Создавать новеллы, запускать перевод, редактировать черновики, управлять глоссарием |
| `admin` | Вручную через CLI | Всё выше + управление пользователями, модерация, просмотр статистики и стоимости |

---

## 3. Функциональные требования

### 3.1 Управление новеллами

- Создание новеллы: название, описание, язык оригинала, жанры (multiple), статус (`ongoing` / `completed` / `hiatus`), обложка
- Slug генерируется автоматически из названия, уникален
- Редактирование и удаление — только владелец или admin
- Список новелл: пагинация (20/страницу), фильтры по жанру / языку / статусу, сортировка по дате обновления / рейтингу

### 3.2 Управление главами

- Переводчик загружает оригинальный текст (plain text / .txt, до 500 КБ)
- Текст сохраняется в R2, в БД хранится только S3-ключ
- Номер главы и заголовок задаются вручную
- Статусы главы: `raw` → `translating` → `draft` → `published`

### 3.3 Translation Pipeline

1. Переводчик нажимает «Перевести» → `POST /api/v1/translate/jobs`
2. Выбирает провайдера (или оставляет `default` из конфига)
3. Job попадает в Redis Queue
4. Worker забирает job:
   - Загружает исходный текст из R2
   - Загружает глоссарий новеллы
   - Строит system prompt (см. раздел 6)
   - Чанкует текст: блоки по 2000 слов с перекрытием 200 слов
   - Вызывает LLM API (retry × 3, exponential backoff: 1s → 2s → 4s)
5. Валидация ответа:
   - Длина ≥ 80% от оригинала → `draft`
   - Длина < 80% → `needs_review` (не публикуется автоматически)
   - Пустой ответ / ошибка API → `failed` + алерт
6. Черновик сохраняется в R2, запись создаётся в `chapter_translations`
7. SSE-уведомление переводчику о завершении

### 3.4 Post-Editing (Редактор)

- Diff-вью: оригинал слева, перевод справа
- Inline-редактирование текста перевода в браузере
- Кнопка «Перегенерировать абзац» — повторный вызов LLM для выбранного блока
- Сохранение черновика без публикации (`PATCH /chapters/:id/draft`)
- Публикация главы (`POST /chapters/:id/publish`) — статус меняется на `published`, глава становится видна читателям, запускается ISR-ревалидация

### 3.5 Глоссарий

- Привязан к новелле (не к главе)
- Поля: `source_term`, `target_term`, `term_type` (`character` / `place` / `skill` / `item` / `other`), `notes`
- CRUD через API и UI-таблицу
- При запуске job глоссарий инжектируется в system prompt целиком
- Лимит: 200 терминов на новеллу

### 3.6 Поиск

- Поиск по: названию, описанию, авторам, тегам
- Фильтры: язык оригинала, жанр, статус перевода
- Движок: Meilisearch
- Индексация: триггер при публикации / обновлении новеллы (Go webhook → Meilisearch)

### 3.7 Читалка

- URL: `/novels/:slug/:chapter-number`
- SSG с ISR revalidate при публикации главы
- Настройки: размер шрифта (S / M / L / XL), тема (light / dark / sepia)
- Прогресс чтения: сохраняется в `bookmarks` (последняя прочитанная глава)
- Навигация: кнопки «Предыдущая» / «Следующая» + выпадающий список глав

### 3.8 Комментарии

- Привязаны к главе
- Threaded (reply to comment), глубина 1 уровень
- Модерация: admin может удалять / скрывать
- Авторизация обязательна для написания

### 3.9 Уведомления

- Email-уведомление подписчикам при публикации новой главы
- In-app уведомление (badge в хедере)
- SSE для статуса translation job

---

## 4. Нефункциональные требования

| Параметр | Требование |
|---|---|
| Время ответа API (p95) | < 200ms для кешированных запросов |
| Translation job | < 60 сек для главы ≤ 3000 слов |
| Lighthouse SEO | ≥ 95 на странице новеллы |
| Lighthouse Performance | ≥ 90 на мобильном |
| Uptime | 99% (без SLA для MVP) |
| Покрытие тестами | ≥ 70% для `internal/service` |
| Безопасность | JWT, bcrypt (cost 12), rate limit на auth endpoints |

---

## 5. Стек технологий

| Слой | Технология | Обоснование |
|---|---|---|
| Frontend | Next.js 14 + TypeScript + shadcn/ui | SSG/ISR для SEO, App Router, типобезопасность |
| Backend | Go 1.22 + Echo v4 | Низкий overhead, один бинарник, удобный деплой |
| Worker | Go (отдельный сервис) | Изоляция тяжёлых задач от API |
| Database | PostgreSQL 16 | Реляционная модель, full-text search |
| Cache / Queue | Redis 7 | Сессии, очередь jobs, rate limiting |
| Search | Meilisearch | Быстрый fuzzy-поиск, просто поднять |
| Storage | Cloudflare R2 | S3-совместимый, дешёвый egress |
| AI (основной) | Claude 3.5 Sonnet | Лучшее качество для художественного текста |
| AI (fallback) | Gemini 2.5 Flash | Дешевле, для черновиков при низком бюджете |

---

## 6. Архитектура

```
┌──────────────────────────────────────────┐
│          Next.js (TypeScript)            │
│  читалка │ редактор │ глоссарий │ поиск  │
└────────────────┬─────────────────────────┘
                 │ REST API (JSON)
┌────────────────▼─────────────────────────┐
│              Go API (Echo)               │
│  auth │ novels │ chapters │ jobs │ search│
└──┬─────────┬──────────┬──────────────────┘
   │         │          │
┌──▼──┐  ┌───▼──┐  ┌────▼──────────────────┐
│ PG  │  │Redis │  │  Translation Worker    │
│     │  │Queue │  │  (Go goroutines)       │
└─────┘  └──────┘  └────────┬──────────────┘
                             │
               ┌─────────────▼─────────────┐
               │    LLM Provider Layer      │
               │  Claude │ GPT-4o │ Gemini  │
               └───────────────────────────┘
                             │
               ┌─────────────▼─────────────┐
               │   Cloudflare R2 (S3)       │
               │  тексты глав и черновиков  │
               └───────────────────────────┘
```

### Структура пакетов Go

```
wn-lab/
├── cmd/
│   ├── api/           # main.go → Echo сервер
│   ├── worker/        # main.go → Job processor
│   └── migrate/       # main.go → goose миграции
├── internal/
│   ├── domain/        # Novel, Chapter, User, Job, Glossary
│   ├── repository/    # SQL (pgx/v5), интерфейсы
│   ├── service/       # Бизнес-логика, зависит от repo-интерфейсов
│   ├── handler/       # Echo handlers, DTO, валидация
│   ├── middleware/    # JWT, rate limit, request logger
│   └── worker/        # Job runner, chunk splitter, validator
├── pkg/
│   ├── jwt/
│   ├── storage/       # S3 client (aws-sdk-go-v2)
│   ├── search/        # Meilisearch client
│   └── translator/    # Интерфейс + реализации провайдеров
├── migrations/        # *.sql файлы (goose)
├── web/               # Next.js
│   ├── app/
│   │   ├── (reader)/
│   │   ├── (editor)/
│   │   └── (admin)/
│   ├── components/
│   ├── lib/
│   └── types/
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
└── Makefile
```

---

## 7. Схема базы данных

```sql
-- Пользователи
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    username      TEXT UNIQUE NOT NULL,
    role          TEXT NOT NULL DEFAULT 'reader', -- reader|translator|admin
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Новеллы
CREATE TABLE novels (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug          TEXT UNIQUE NOT NULL,
    title         TEXT NOT NULL,
    description   TEXT,
    original_lang TEXT NOT NULL,  -- zh|ja|ko|en
    status        TEXT NOT NULL DEFAULT 'ongoing', -- ongoing|completed|hiatus
    cover_url     TEXT,
    owner_id      UUID REFERENCES users(id),
    rating        NUMERIC(3,2) DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Главы
CREATE TABLE chapters (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    number       INTEGER NOT NULL,
    title        TEXT,
    source_key   TEXT NOT NULL,   -- S3 ключ к оригинальному тексту
    status       TEXT NOT NULL DEFAULT 'raw', -- raw|translating|draft|published
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(novel_id, number)
);

-- Переводы глав
CREATE TABLE chapter_translations (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id   UUID REFERENCES chapters(id) ON DELETE CASCADE,
    lang         TEXT NOT NULL,   -- целевой язык: ru|en|...
    content_key  TEXT,            -- S3 ключ к переведённому тексту
    status       TEXT NOT NULL DEFAULT 'draft', -- draft|needs_review|published
    job_id       UUID,
    edited_by    UUID REFERENCES users(id),
    published_at TIMESTAMPTZ,
    version      INTEGER NOT NULL DEFAULT 1,
    UNIQUE(chapter_id, lang, version)
);

-- Translation Jobs
CREATE TABLE translation_jobs (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id   UUID REFERENCES chapters(id),
    provider     TEXT NOT NULL,   -- claude|openai|gemini
    status       TEXT NOT NULL DEFAULT 'pending', -- pending|processing|done|failed|needs_review
    source_lang  TEXT NOT NULL,
    target_lang  TEXT NOT NULL,
    cost_tokens  INTEGER,
    error_msg    TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    finished_at  TIMESTAMPTZ
);

-- Глоссарий
CREATE TABLE glossaries (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    source_term  TEXT NOT NULL,
    target_term  TEXT NOT NULL,
    term_type    TEXT NOT NULL DEFAULT 'other', -- character|place|skill|item|other
    notes        TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(novel_id, source_term)
);

-- Закладки
CREATE TABLE bookmarks (
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    chapter_id   UUID REFERENCES chapters(id),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id, novel_id)
);

-- Подписки
CREATE TABLE subscriptions (
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    novel_id     UUID REFERENCES novels(id) ON DELETE CASCADE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user_id, novel_id)
);

-- Комментарии
CREATE TABLE comments (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id   UUID REFERENCES chapters(id) ON DELETE CASCADE,
    user_id      UUID REFERENCES users(id),
    parent_id    UUID REFERENCES comments(id),
    body         TEXT NOT NULL,
    hidden       BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 8. API Reference

### Auth

```
POST   /api/v1/auth/register    body: {email, username, password}
POST   /api/v1/auth/login       body: {email, password} → {token, refresh}
POST   /api/v1/auth/refresh     body: {refresh_token}
DELETE /api/v1/auth/logout
```

### Novels

```
GET    /api/v1/novels                    ?page&limit&genre&lang&status&sort
GET    /api/v1/novels/:slug
POST   /api/v1/novels                    🔒 translator+
PATCH  /api/v1/novels/:id               🔒 owner|admin
DELETE /api/v1/novels/:id               🔒 admin
POST   /api/v1/novels/:id/cover         🔒 owner|admin  (multipart)
```

### Chapters

```
GET    /api/v1/novels/:slug/chapters
GET    /api/v1/novels/:slug/chapters/:number
POST   /api/v1/novels/:id/chapters      🔒 translator+  (multipart, .txt)
PATCH  /api/v1/chapters/:id             🔒 owner|admin
DELETE /api/v1/chapters/:id             🔒 owner|admin
```

### Translation

```
POST   /api/v1/translate/jobs           🔒 translator+  body: {chapter_id, provider, target_lang}
GET    /api/v1/translate/jobs/:id       🔒 translator+
DELETE /api/v1/translate/jobs/:id       🔒 owner|admin
GET    /api/v1/chapters/:id/draft       🔒 translator+
PATCH  /api/v1/chapters/:id/draft       🔒 translator+  body: {content}
POST   /api/v1/chapters/:id/publish     🔒 translator+
```

### Glossary

```
GET    /api/v1/novels/:id/glossary
POST   /api/v1/novels/:id/glossary      🔒 translator+
PATCH  /api/v1/glossary/:term_id        🔒 owner|admin
DELETE /api/v1/glossary/:term_id        🔒 owner|admin
```

### Search & Social

```
GET    /api/v1/search?q=&lang=&status=&genre=
POST   /api/v1/novels/:id/subscribe     🔒 reader+
DELETE /api/v1/novels/:id/subscribe     🔒 reader+
GET    /api/v1/chapters/:id/comments
POST   /api/v1/chapters/:id/comments    🔒 reader+
DELETE /api/v1/comments/:id             🔒 owner|admin
```

### SSE

```
GET    /api/v1/jobs/:id/stream          🔒 translator+  → события: progress|done|failed
```

---

## 9. System Prompt (Translation Worker)

```
You are a literary translator working on chapter {chapter_number} of "{novel_title}".
Translate from {source_lang} to {target_lang}.

MANDATORY GLOSSARY — never deviate from these translations:
{glossary_entries}

RULES:
1. Translate every sentence — do not skip or summarize any content
2. Preserve all paragraph breaks exactly as in the source
3. Use literary style, not literal word-for-word translation
4. Keep the tone and voice consistent with previous chapters
5. Do not add translator notes or explanations
6. Do not translate proper nouns not listed in the glossary — transliterate them

CONTEXT (summary of previous chapters):
{rolling_summary}

SOURCE TEXT:
{chunk_text}
```

---

## 10. LLM Provider Interface (Go)

```go
type Translator interface {
    Translate(ctx context.Context, req TranslateRequest) (TranslateResponse, error)
    Name() string
}

type TranslateRequest struct {
    Text         string
    SourceLang   string
    TargetLang   string
    Glossary     []GlossaryEntry
    PrevSummary  string
    ChapterNum   int
    NovelTitle   string
}

type TranslateResponse struct {
    Text        string
    InputTokens int
    OutTokens   int
    Provider    string
}
```

---

## 11. Переменные окружения

```env
# Server
PORT=8080
ENV=development  # development|production

# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/wnlab?sslmode=disable
DB_MAX_CONNS=25

# Redis
REDIS_URL=redis://localhost:6379
REDIS_QUEUE_KEY=wn:jobs

# JWT
JWT_SECRET=min-32-chars-random-string
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=168h

# Storage
S3_ENDPOINT=https://<id>.r2.cloudflarestorage.com
S3_BUCKET=wn-lab
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=auto

# AI Providers
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=
DEFAULT_PROVIDER=claude
FALLBACK_PROVIDER=gemini

# Translation
MAX_TOKENS_PER_JOB=8000
CHUNK_SIZE_WORDS=2000
CHUNK_OVERLAP_WORDS=200
MIN_RESPONSE_RATIO=0.80
JOB_RETRY_COUNT=3
MONTHLY_BUDGET_USD=50

# Meilisearch
MEILI_URL=http://localhost:7700
MEILI_MASTER_KEY=

# Email (опционально для MVP)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
FROM_EMAIL=noreply@wn-lab.com
```

---

## 12. Makefile

```makefile
.PHONY: dev test lint build migrate-up migrate-down seed

dev:
	go run ./cmd/api & go run ./cmd/worker

test:
	go test ./... -race -count=1

lint:
	golangci-lint run ./...

build:
	go build -o bin/api ./cmd/api
	go build -o bin/worker ./cmd/worker

migrate-up:
	go run ./cmd/migrate up

migrate-down:
	go run ./cmd/migrate down

seed:
	go run ./cmd/migrate seed
```

---

## 13. docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: wnlab
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  meilisearch:
    image: getmeili/meilisearch:v1.7
    ports:
      - "7700:7700"
    environment:
      MEILI_MASTER_KEY: local-dev-key
    volumes:
      - meili_data:/meili_data

volumes:
  pg_data:
  meili_data:
```

---

## 14. Фазы разработки

### Фаза 1 — MVP (4–6 недель)

- [ ] Инициализация монорепо, Docker Compose, Makefile
- [ ] Миграции: все таблицы из раздела 7
- [ ] Go API: auth (JWT), CRUD новелл и глав, загрузка текста в R2
- [ ] Translation Worker: queue, LLM клиенты (Claude + Gemini), валидация
- [ ] Глоссарий: CRUD + инжект в prompt
- [ ] Next.js: каталог (SSG), страница новеллы, читалка (ISR), роутинг
- [ ] SEO: sitemap.xml, robots.txt, динамические метатеги

### Фаза 2 — Вовлечение (2–3 недели)

- [ ] Bookmarks + reading progress
- [ ] Комментарии (threaded)
- [ ] Подписки + email-уведомления о новых главах
- [ ] SSE для статуса translation job
- [ ] Post-editing UI: diff-вью, inline-редактирование, «Перегенерировать абзац»

### Фаза 3 — Оптимизация (2 недели)

- [ ] Meilisearch: индексация новелл, поиск с фильтрами
- [ ] Rolling summary: автогенерация краткого содержания после каждой главы
- [ ] Cost monitoring: dashboard стоимости LLM по провайдерам
- [ ] Автопереключение провайдера при достижении бюджета
- [ ] Кеш абзацев: хеш → перевод (избегать повторных вызовов LLM)
- [ ] Админ-панель: статистика, управление пользователями, модерация

---

## 15. Acceptance Criteria

### Backend

- [ ] `go test ./...` проходит без ошибок, покрытие `internal/service` ≥ 70%
- [ ] `golangci-lint run` — 0 ошибок
- [ ] Translation job завершается < 60 сек для главы ≤ 3000 слов
- [ ] При 3 неудачных retry → `status=failed`, ошибка логируется
- [ ] Длина ответа < 80% оригинала → `needs_review`, не публикуется
- [ ] Глоссарий из 10 терминов → 0 отклонений в переводе
- [ ] Rate limit на `POST /auth/login`: 5 запросов / минуту / IP

### Frontend

- [ ] `tsc --noEmit` — 0 ошибок
- [ ] `eslint --max-warnings 0` — 0 предупреждений
- [ ] Lighthouse SEO ≥ 95 на `/novels/:slug`
- [ ] Lighthouse Performance ≥ 90 на мобильном
- [ ] Страница главы генерируется статически при публикации (ISR)

### Безопасность

- [ ] Переводчик не может редактировать чужие главы → 403
- [ ] Reader не может запустить translation job → 403
- [ ] JWT истекает через 24ч, refresh через 7 дней
- [ ] Секреты не попадают в git (проверка через `git secrets`)

---

## 16. Риски и митигация

| Риск | Вероятность | Митигация |
|---|---|---|
| LLM пропускает предложения | Высокая | Валидация длины ответа, статус `needs_review` |
| Непоследовательные имена | Высокая | Обязательный глоссарий, инжект в каждый prompt |
| Превышение бюджета LLM | Средняя | `MONTHLY_BUDGET_USD`, автопереключение на Gemini |
| Авторские права | Средняя | Политика DMCA, форма для жалоб, страница правил |
| CJK-поиск в Meilisearch | Средняя | Настройка `dictionary` + `tokenizer` для CJK |
| Рост объёма R2 | Низкая | Мониторинг использования, архивирование старых draft |

---

## 17. Соглашения

- **Commits**: Conventional Commits — `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- **Branches**: `main` → `dev` → `feature/<name>` / `fix/<name>`
- **PR**: обязателен review перед мержем в `dev`; линтер и тесты в CI
- **Secrets**: только через `.env`; коммитить только `.env.example`
- **Go**: идиоматично — ошибки как значения, маленькие интерфейсы, `context` везде
- **TypeScript**: `strict: true`, без `any`, runtime-валидация входных данных (zod)

---

## License

MIT
