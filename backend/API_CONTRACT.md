# WN-Lab Backend API Contract

This document describes the API surface needed to connect the current Next.js
frontend to the FastAPI backend.

The frontend is currently static and uses local mock data in `frontend/src/data`
plus several inline arrays inside page components. This file turns those UI
needs into a backend contract that can be implemented incrementally.

## Base Conventions

Base URL in local development:

```text
http://localhost:8000
```

Recommended API prefix for product endpoints:

```text
/api/v1
```

Existing service endpoints:

```text
GET /
GET /health
```

Authentication is not implemented yet. Endpoints marked `Auth: required` should
eventually read the current user from an access token/session. During early
development they can return data for a seeded demo user.

## Response Shape

Use plain JSON objects for single resources:

```json
{
  "id": "neuromant",
  "title": "Нейромант"
}
```

Use this shape for paginated lists:

```json
{
  "items": [],
  "page": 1,
  "pageSize": 24,
  "total": 120
}
```

Use this shape for API errors:

```json
{
  "error": {
    "code": "book_not_found",
    "message": "Book was not found.",
    "details": {}
  }
}
```

Common status codes:

```text
200 OK
201 Created
202 Accepted
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```

## Core Models

### User

```ts
type User = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  coverUrl: string | null;
  bio: string | null;
  level: number;
  streakDays: number;
  favoriteGenre: string | null;
  registeredAt: string;
};
```

### Book

```ts
type Book = {
  id: string;
  slug: string;
  title: string;
  originalTitle: string | null;
  author: string;
  description: string;
  coverUrl: string;
  heroImageUrl: string | null;
  genres: string[];
  tags: string[];
  rating: number;
  publicationYear: number | null;
  translationProgress: number;
  status: "ongoing" | "completed" | "paused";
  chaptersCount: number;
  href: string;
};
```

### Chapter

```ts
type Chapter = {
  id: string;
  bookId: string;
  number: number;
  title: string;
  slug: string;
  status: "draft" | "translating" | "translated" | "published";
  publishedAt: string | null;
};
```

### ReadingProgress

```ts
type ReadingProgress = {
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  progressPercent: number;
  scrollOffset: number | null;
  updatedAt: string;
};
```

### LibraryItem

```ts
type LibraryItem = {
  book: Book;
  progress: ReadingProgress | null;
  categories: Array<"reading" | "favorites" | "completed">;
  addedAt: string;
};
```

### Notification

```ts
type Notification = {
  id: string;
  type: "new_chapter" | "system" | "achievement" | "comment_reply";
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  targetUrl: string | null;
};
```

### ReaderSettings

```ts
type ReaderSettings = {
  defaultFont: "Inter" | "Newsreader" | "Tinos" | "Noto Sans";
  fontSize: number;
  readingMode: "scroll" | "paged";
  emailNotifications: boolean;
};
```

### TranslationJob

```ts
type TranslationJob = {
  id: string;
  title: string;
  author: string | null;
  sourceLanguage: string;
  targetLanguage: string;
  fileName: string;
  fileSize: number;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  queuePosition: number | null;
  createdAt: string;
  completedAt: string | null;
  resultBookId: string | null;
};
```

### SupportTicket

```ts
type SupportTicket = {
  id: string;
  type: "complaint" | "bug" | "access" | "copyright" | "other";
  subject: string;
  message: string;
  email: string | null;
  status: "new" | "in_review" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
};
```

### LegalDocument

```ts
type LegalDocument = {
  slug: "terms";
  title: string;
  version: string;
  publishedAt: string | null;
  updatedAt: string | null;
  content: string;
};
```

## Frontend Route To API Map

```text
/                           -> GET /api/v1/home
/catalog                    -> GET /api/v1/books
/catalog/[slug]             -> GET /api/v1/books/{slug}
/catalog/[slug]/read        -> GET /api/v1/books/{slug}/chapters/{chapterNumber}
/catalog/[slug]/read/focus  -> same reader API, different UI mode
/library                    -> GET /api/v1/me/library?category=all
/library/reading            -> GET /api/v1/me/library?category=reading
/library/favorites          -> GET /api/v1/me/library?category=favorites
/library/completed          -> GET /api/v1/me/library?category=completed
/notifications              -> GET /api/v1/me/notifications
/settings                   -> GET/PATCH /api/v1/me/settings
/profile                    -> GET /api/v1/me/profile
/translate                  -> translation endpoints
/support                    -> GET /api/v1/support/page
/terms                      -> GET /api/v1/legal/terms
```

## System

### GET /

Already implemented.

Purpose: quick service sanity response.

Response:

```json
{
  "message": "WN-Lab API is running"
}
```

### GET /health

Already implemented.

Purpose: health check for dev server, deploy platform, and monitoring.

Response:

```json
{
  "status": "ok"
}
```

## Home

### GET /api/v1/home

Auth: optional

Used by: `/`

Purpose: returns all data for the home page in one request.

Response:

```ts
type HomeResponse = {
  continueReading: Array<{
    bookId: string;
    slug: string;
    title: string;
    chapterTitle: string;
    chapterNumber: number;
    progress: number;
    coverUrl: string;
    readUrl: string;
  }>;
  popularThisWeek: Array<{
    bookId: string;
    slug: string;
    title: string;
    author: string;
    rating: number;
    coverUrl: string;
  }>;
  latestUpdates: Array<{
    bookId: string;
    slug: string;
    title: string;
    coverUrl: string;
    chapterTitle: string;
    chapterNumber: number;
    publishedAt: string;
  }>;
  featuredCollection: {
    id: string;
    title: string;
    eyebrow: string;
    description: string;
    coverUrl: string;
    href: string;
  };
};
```

## Catalog

### GET /api/v1/books

Auth: optional

Used by: `/catalog`

Query params:

```text
q?: string
genre?: string
status?: ongoing|completed|paused
sort?: popular|rating|updated|title
page?: number
pageSize?: number
```

Response:

```ts
type BooksResponse = {
  items: Book[];
  page: number;
  pageSize: number;
  total: number;
};
```

### GET /api/v1/books/{slug}

Auth: optional

Used by: `/catalog/neuromant`

Response:

```ts
type BookDetailResponse = {
  book: Book;
  userState: {
    isFavorite: boolean;
    inLibrary: boolean;
    progress: ReadingProgress | null;
  } | null;
  chapters: Chapter[];
};
```

### POST /api/v1/books/{slug}/favorite

Auth: required

Purpose: add a book to favorites.

Response:

```json
{
  "isFavorite": true
}
```

### DELETE /api/v1/books/{slug}/favorite

Auth: required

Purpose: remove a book from favorites.

Response:

```json
{
  "isFavorite": false
}
```

## Reader

### GET /api/v1/books/{slug}/chapters/{chapterNumber}

Auth: optional or required depending on access rules

Used by:

```text
/catalog/[slug]/read
/catalog/[slug]/read/focus
```

Response:

```ts
type ReaderChapterResponse = {
  book: {
    id: string;
    slug: string;
    title: string;
    author: string;
  };
  chapter: {
    id: string;
    number: number;
    title: string;
    content: string[];
    previousChapterNumber: number | null;
    nextChapterNumber: number | null;
  };
  progress: ReadingProgress | null;
  chapterIndexText: string;
};
```

### PATCH /api/v1/books/{slug}/chapters/{chapterNumber}/progress

Auth: required

Purpose: persist reader progress.

Request:

```json
{
  "progressPercent": 58,
  "scrollOffset": 1840
}
```

Response:

```ts
type UpdateProgressResponse = ReadingProgress;
```

### GET /api/v1/books/{slug}/chapters

Auth: optional

Purpose: chapter list for a future table of contents.

Response:

```ts
type ChaptersResponse = {
  items: Chapter[];
};
```

## User Library

### GET /api/v1/me/library

Auth: required

Used by:

```text
/library
/library/reading
/library/favorites
/library/completed
```

Query params:

```text
category?: all|reading|favorites|completed
q?: string
page?: number
pageSize?: number
```

Response:

```ts
type LibraryResponse = {
  category: "all" | "reading" | "favorites" | "completed";
  items: LibraryItem[];
  page: number;
  pageSize: number;
  total: number;
};
```

### POST /api/v1/me/library

Auth: required

Purpose: add a book to the user's library.

Request:

```json
{
  "bookId": "neuromant"
}
```

Response:

```ts
type AddToLibraryResponse = LibraryItem;
```

### DELETE /api/v1/me/library/{bookId}

Auth: required

Purpose: remove a book from the user's library.

Response:

```json
{
  "removed": true
}
```

### PATCH /api/v1/me/library/{bookId}

Auth: required

Purpose: update user-specific library flags.

Request:

```json
{
  "isFavorite": true,
  "isCompleted": false
}
```

Response:

```ts
type UpdateLibraryItemResponse = LibraryItem;
```

## Profile

### GET /api/v1/me/profile

Auth: required

Used by: `/profile`

Response:

```ts
type ProfileResponse = {
  user: User;
  stats: Array<{
    key: "booksRead" | "readingHours" | "reviews" | "karma";
    value: string;
    label: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    tone: string;
    icon: string;
    unlockedAt: string | null;
  }>;
  activity: Array<{
    id: string;
    type: "read" | "comment" | "favorite" | "complete";
    text: string;
    meta: string;
    createdAt: string;
  }>;
};
```

### PATCH /api/v1/me/profile

Auth: required

Purpose: edit profile fields.

Request:

```json
{
  "displayName": "Alex Reader",
  "bio": "Исследователь цифровых миров",
  "favoriteGenre": "Киберпанк"
}
```

Response:

```ts
type UpdateProfileResponse = User;
```

## Notifications

### GET /api/v1/me/notifications

Auth: required

Used by: `/notifications`

Query params:

```text
status?: all|read|unread
page?: number
pageSize?: number
```

Response:

```ts
type NotificationsResponse = {
  items: Notification[];
  unreadCount: number;
  page: number;
  pageSize: number;
  total: number;
};
```

### PATCH /api/v1/me/notifications/{notificationId}

Auth: required

Purpose: mark one notification as read/unread.

Request:

```json
{
  "isRead": true
}
```

Response:

```ts
type UpdateNotificationResponse = Notification;
```

### POST /api/v1/me/notifications/mark-all-read

Auth: required

Purpose: mark every notification as read.

Response:

```json
{
  "updated": 4,
  "unreadCount": 0
}
```

## Settings

### GET /api/v1/me/settings

Auth: required

Used by: `/settings`

Response:

```ts
type SettingsResponse = {
  reader: ReaderSettings;
};
```

### PATCH /api/v1/me/settings

Auth: required

Request:

```json
{
  "reader": {
    "defaultFont": "Inter",
    "fontSize": 18,
    "readingMode": "scroll",
    "emailNotifications": true
  }
}
```

Response:

```ts
type UpdateSettingsResponse = {
  reader: ReaderSettings;
};
```

## Translation

### GET /api/v1/translation/dashboard

Auth: required

Used by: `/translate`

Purpose: data needed to render the translator dashboard.

Response:

```ts
type TranslationDashboardResponse = {
  engine: {
    name: string;
    version: string;
    status: "online" | "degraded" | "offline";
  };
  queue: TranslationJob[];
  history: TranslationJob[];
  serverStatus: {
    activeNodes: number;
    totalNodes: number;
    queuedFiles: number;
    averageWaitSeconds: number;
  };
  userPlan: {
    name: "free" | "pro";
    hasPriorityQueue: boolean;
  };
};
```

### POST /api/v1/translation/jobs

Auth: required

Content type:

```text
multipart/form-data
```

Fields:

```text
title: string
author?: string
sourceLanguage: string
targetLanguage: string
file: UploadFile
```

Response:

```ts
type CreateTranslationJobResponse = TranslationJob;
```

### GET /api/v1/translation/jobs

Auth: required

Query params:

```text
status?: queued|processing|completed|failed
page?: number
pageSize?: number
```

Response:

```ts
type TranslationJobsResponse = {
  items: TranslationJob[];
  page: number;
  pageSize: number;
  total: number;
};
```

### GET /api/v1/translation/jobs/{jobId}

Auth: required

Response:

```ts
type TranslationJobResponse = TranslationJob;
```

### POST /api/v1/translation/jobs/{jobId}/cancel

Auth: required

Response:

```json
{
  "cancelled": true
}
```

## Support

### GET /api/v1/support/page

Auth: optional

Used by: `/support`

Purpose: returns the content needed to render the support page.

Response:

```ts
type SupportPageResponse = {
  page: {
    eyebrow: string;
    title: string;
    description: string;
  };
  ticketTypes: Array<{
    value: "complaint" | "bug" | "access" | "copyright" | "other";
    label: string;
    description: string;
  }>;
  contact: {
    email: string | null;
    enabled: boolean;
    note: string;
  };
  status: {
    formEnabled: boolean;
    note: string;
  };
};
```

### POST /api/v1/support/tickets

Auth: optional

Purpose: create a user complaint or support request.

Request:

```json
{
  "type": "complaint",
  "subject": "Жалоба на произведение",
  "message": "Описание обращения",
  "email": "user@example.com"
}
```

Response:

```ts
type CreateSupportTicketResponse = SupportTicket;
```

### GET /api/v1/me/support/tickets

Auth: required

Purpose: return the current user's submitted support tickets.

Response:

```ts
type MySupportTicketsResponse = {
  items: SupportTicket[];
  total: number;
};
```

## Legal

### GET /api/v1/legal/terms

Auth: optional

Used by: `/terms`

Purpose: returns the current public version of the user agreement.

Response:

```ts
type TermsResponse = {
  document: LegalDocument;
};
```

## Search

### GET /api/v1/search

Auth: optional

Used by: global header search and catalog/library search.

Query params:

```text
q: string
scope?: all|books|authors|library
limit?: number
```

Response:

```ts
type SearchResponse = {
  items: Array<{
    type: "book" | "author" | "chapter";
    id: string;
    title: string;
    subtitle: string | null;
    coverUrl: string | null;
    href: string;
  }>;
};
```

## Suggested FastAPI Structure

Recommended backend modules:

```text
backend/app/api/routes/health.py
backend/app/api/routes/home.py
backend/app/api/routes/books.py
backend/app/api/routes/library.py
backend/app/api/routes/profile.py
backend/app/api/routes/notifications.py
backend/app/api/routes/settings.py
backend/app/api/routes/translation.py
backend/app/api/routes/support.py
backend/app/api/routes/legal.py
backend/app/api/routes/search.py
backend/app/schemas/
backend/app/services/
backend/app/models/
```

Router registration in `backend/app/main.py` should eventually look like this:

```py
app.include_router(health_router)
app.include_router(home_router, prefix="/api/v1")
app.include_router(books_router, prefix="/api/v1")
app.include_router(library_router, prefix="/api/v1")
app.include_router(profile_router, prefix="/api/v1")
app.include_router(notifications_router, prefix="/api/v1")
app.include_router(settings_router, prefix="/api/v1")
app.include_router(translation_router, prefix="/api/v1")
app.include_router(support_router, prefix="/api/v1")
app.include_router(legal_router, prefix="/api/v1")
app.include_router(search_router, prefix="/api/v1")
```

## Implementation Priority

1. `GET /api/v1/home`
2. `GET /api/v1/books`
3. `GET /api/v1/books/{slug}`
4. `GET /api/v1/books/{slug}/chapters/{chapterNumber}`
5. `GET /api/v1/me/library`
6. `GET /api/v1/me/profile`
7. `GET /api/v1/me/notifications`
8. `GET/PATCH /api/v1/me/settings`
9. `GET /api/v1/support/page`
10. `GET /api/v1/legal/terms`
11. Translation job endpoints
12. Mutations for favorites, library state, notifications, reading progress, and support tickets

This order matches the current frontend screens and lets the project replace
mock data page by page without blocking the rest of the UI.
