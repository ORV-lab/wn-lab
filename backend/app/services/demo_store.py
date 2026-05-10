from __future__ import annotations

from copy import deepcopy
from datetime import UTC, datetime, timedelta
import secrets
from typing import Any
from uuid import uuid4


def _iso(value: datetime) -> str:
    return value.astimezone(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


NOW = datetime(2026, 5, 10, 9, 0, tzinfo=UTC)

BOOKS: list[dict[str, Any]] = [
    {
        "id": "neuromant",
        "slug": "neuromant",
        "title": "Нейромант",
        "originalTitle": "Neuromancer",
        "author": "Уильям Гибсон",
        "description": (
            "Классический роман о киберпространстве, цифровых корпорациях и последнем "
            "шансe Кейса вернуть себе доступ к матрице."
        ),
        "coverUrl": "https://www.figma.com/api/mcp/asset/e2f7ea6b-4963-4b38-b49c-31cb8fc2a305",
        "heroImageUrl": "https://www.figma.com/api/mcp/asset/710c8a35-18ba-41c0-bead-6ec3fe77561d",
        "genres": ["Киберпанк", "Научная фантастика"],
        "tags": ["ИИ-перевод", "Матрица", "Классика"],
        "rating": 4.8,
        "publicationYear": 1984,
        "translationProgress": 100,
        "status": "completed",
        "chaptersCount": 24,
        "href": "/catalog/neuromant",
    },
    {
        "id": "dune",
        "slug": "dune",
        "title": "Дюна",
        "originalTitle": "Dune",
        "author": "Фрэнк Герберт",
        "description": "Политика, экология и мессианство на песках Арракиса.",
        "coverUrl": "https://www.figma.com/api/mcp/asset/93a4e1f2-f8bd-4eb5-8b34-a727306836bf",
        "heroImageUrl": None,
        "genres": ["Научная фантастика"],
        "tags": ["Пустыня", "Империя"],
        "rating": 4.9,
        "publicationYear": 1965,
        "translationProgress": 92,
        "status": "ongoing",
        "chaptersCount": 18,
        "href": "/catalog/dune",
    },
    {
        "id": "foundation",
        "slug": "foundation",
        "title": "Основание",
        "originalTitle": "Foundation",
        "author": "Айзек Азимов",
        "description": "Психоистория против распада галактической цивилизации.",
        "coverUrl": "https://www.figma.com/api/mcp/asset/a6cc7a3c-1df1-4d92-a6ea-d5c4f30bd598",
        "heroImageUrl": None,
        "genres": ["Научная фантастика"],
        "tags": ["Галактика", "Империя"],
        "rating": 4.7,
        "publicationYear": 1951,
        "translationProgress": 76,
        "status": "ongoing",
        "chaptersCount": 16,
        "href": "/catalog/foundation",
    },
    {
        "id": "androids",
        "slug": "androids",
        "title": "Мечтают ли андроиды об электроовцах?",
        "originalTitle": "Do Androids Dream of Electric Sheep?",
        "author": "Филип К. Дик",
        "description": "Охота на репликантов и сомнения в природе человечности.",
        "coverUrl": "https://www.figma.com/api/mcp/asset/61152887-a879-4195-9258-78a633f1769c",
        "heroImageUrl": None,
        "genres": ["Киберпанк", "Научная фантастика"],
        "tags": ["Андроиды", "Детектив"],
        "rating": 4.6,
        "publicationYear": 1968,
        "translationProgress": 84,
        "status": "ongoing",
        "chaptersCount": 12,
        "href": "/catalog/androids",
    },
    {
        "id": "hyperion",
        "slug": "hyperion",
        "title": "Гиперион",
        "originalTitle": "Hyperion",
        "author": "Дэн Симмонс",
        "description": "Паломничество к Шрайку на фоне войны миров и ИИ-фракций.",
        "coverUrl": "https://www.figma.com/api/mcp/asset/d7e3770b-3e34-4639-a53d-2ec57e08a4ff",
        "heroImageUrl": None,
        "genres": ["Научная фантастика"],
        "tags": ["Паломничество", "Эпос"],
        "rating": 4.6,
        "publicationYear": 1989,
        "translationProgress": 61,
        "status": "paused",
        "chaptersCount": 24,
        "href": "/catalog/hyperion",
    },
    {
        "id": "three-body",
        "slug": "three-body",
        "title": "Задача трёх тел",
        "originalTitle": "The Three-Body Problem",
        "author": "Лю Цысинь",
        "description": "Первый контакт, наука и цивилизационный риск космического масштаба.",
        "coverUrl": "https://www.figma.com/api/mcp/asset/404f92af-7829-4785-a722-46fe64d5024a",
        "heroImageUrl": None,
        "genres": ["Научная фантастика"],
        "tags": ["Контакт", "Физика"],
        "rating": 4.7,
        "publicationYear": 2006,
        "translationProgress": 88,
        "status": "ongoing",
        "chaptersCount": 22,
        "href": "/catalog/three-body",
    },
]

BOOKS_BY_SLUG = {book["slug"]: book for book in BOOKS}
BOOKS_BY_ID = {book["id"]: book for book in BOOKS}

CHAPTERS_BY_BOOK: dict[str, list[dict[str, Any]]] = {
    "neuromant": [
        {
            "id": "neuromant-1",
            "bookId": "neuromant",
            "number": 1,
            "title": "Небо над портом",
            "slug": "chapter-1",
            "status": "published",
            "publishedAt": _iso(NOW - timedelta(days=600)),
            "content": [
                "Небо над портом было цвета телеэкрана, включенного на мёртвый канал.",
                "Кейс слышал в шуме Чацубо привычное обещание работы, риска и новых долгов.",
                "Ратц без слов поставил перед ним кружку и посмотрел так, словно уже знал итог.",
                "Когда-то Кейс был лучшим ковбоем консоли на Спрауле, но это было до ошибки.",
                "Теперь он жил в Тибе, надеясь найти способ вернуть себе матрицу или сгореть окончательно.",
                "Город вокруг не спал ни секунды: неон, импланты, сделки и жизнь на обрыве.",
            ],
        },
        {
            "id": "neuromant-2",
            "bookId": "neuromant",
            "number": 2,
            "title": "Тибский след",
            "slug": "chapter-2",
            "status": "published",
            "publishedAt": _iso(NOW - timedelta(days=599)),
            "content": [
                "Молли нашла Кейса раньше, чем он успел решить, нужно ли ему ещё одно предложение.",
                "Её отражённые линзы не выдавали эмоций, но контракт уже начинал закрываться вокруг него.",
                "Цена свободы оказалась выше, чем он рассчитывал, и всё же впервые за месяцы ему стало интересно.",
            ],
        },
        {
            "id": "neuromant-14",
            "bookId": "neuromant",
            "number": 14,
            "title": "Орбита",
            "slug": "chapter-14",
            "status": "published",
            "publishedAt": _iso(NOW - timedelta(days=580)),
            "content": [
                "Станция дрожала от тихого гула систем жизнеобеспечения и чужих секретов.",
                "Орбитальная тишина делала каждое решение окончательным, а каждый шаг звучал как признание.",
                "Кейс понимал, что финальная игра уже началась, даже если правил никто не озвучивал.",
            ],
        },
        {
            "id": "neuromant-15",
            "bookId": "neuromant",
            "number": 15,
            "title": "Шёпот зимы",
            "slug": "chapter-15",
            "status": "published",
            "publishedAt": _iso(NOW - timedelta(hours=2)),
            "content": [
                "Зима молчала не потому, что ей нечего было сказать, а потому что она уже всё рассчитала.",
                "В матрице даже пауза ощущалась как давление, словно невидимая рука удерживала дыхание сети.",
                "Кейс пошёл вперёд, потому что отступление больше не выглядело живым вариантом.",
            ],
        },
    ]
}

DEMO_USER: dict[str, Any] = {
    "id": "user-demo",
    "username": "alexreader",
    "displayName": "Alex Reader",
    "email": "alex.reader@wn-lab.io",
    "avatarUrl": "https://www.figma.com/api/mcp/asset/dbd3445b-b1e2-4065-98df-58dae30e502e",
    "coverUrl": "https://www.figma.com/api/mcp/asset/f93f0474-cbec-4cca-9f1c-27609b25f9c3",
    "bio": "Исследователь цифровых миров, коллекционер редких изданий и охотник за хорошими переводами.",
    "level": 42,
    "streakDays": 14,
    "favoriteGenre": "Киберпанк",
    "registeredAt": _iso(datetime(2023, 10, 15, 12, 0, tzinfo=UTC)),
}

USERS_BY_ID: dict[str, dict[str, Any]] = {
    DEMO_USER["id"]: {
        **deepcopy(DEMO_USER),
        "password": "demo12345",
    }
}
USERS_BY_EMAIL: dict[str, str] = {DEMO_USER["email"].lower(): DEMO_USER["id"]}
SESSION_TOKENS: dict[str, str] = {}

READING_PROGRESS: dict[str, dict[str, Any]] = {
    "neuromant": {
        "bookId": "neuromant",
        "chapterId": "neuromant-14",
        "chapterNumber": 14,
        "progressPercent": 68,
        "scrollOffset": 1840,
        "updatedAt": _iso(NOW - timedelta(hours=1)),
    },
    "dune": {
        "bookId": "dune",
        "chapterId": "dune-2",
        "chapterNumber": 2,
        "progressPercent": 58,
        "scrollOffset": 930,
        "updatedAt": _iso(NOW - timedelta(days=1)),
    },
    "foundation": {
        "bookId": "foundation",
        "chapterId": "foundation-5",
        "chapterNumber": 5,
        "progressPercent": 12,
        "scrollOffset": 140,
        "updatedAt": _iso(NOW - timedelta(days=2)),
    },
}

LIBRARY_STATE: dict[str, dict[str, Any]] = {
    "neuromant": {
        "categories": {"reading", "favorites"},
        "addedAt": _iso(NOW - timedelta(days=35)),
    },
    "dune": {
        "categories": {"completed", "favorites"},
        "addedAt": _iso(NOW - timedelta(days=50)),
    },
    "foundation": {
        "categories": {"reading"},
        "addedAt": _iso(NOW - timedelta(days=20)),
    },
}

NOTIFICATIONS: list[dict[str, Any]] = [
    {
        "id": "notif-1",
        "type": "new_chapter",
        "title": "Новая глава",
        "body": "Вышла 15 глава «Нейромант». Перевод уже доступен для чтения.",
        "createdAt": _iso(NOW - timedelta(hours=2)),
        "isRead": False,
        "targetUrl": "/catalog/neuromant/read?chapter=15",
    },
    {
        "id": "notif-2",
        "type": "system",
        "title": "Системное уведомление",
        "body": "Обновление движка перевода завершено. Средняя скорость выросла на 15%.",
        "createdAt": _iso(NOW - timedelta(days=1)),
        "isRead": False,
        "targetUrl": None,
    },
    {
        "id": "notif-3",
        "type": "achievement",
        "title": "Новое достижение",
        "body": "Вы получили достижение «Книжный червь» за 100 часов чтения.",
        "createdAt": _iso(NOW - timedelta(days=3)),
        "isRead": True,
        "targetUrl": "/profile",
    },
    {
        "id": "notif-4",
        "type": "comment_reply",
        "title": "Ответ на комментарий",
        "body": "CyberPunk2077 ответил на ваш комментарий к «Дюне».",
        "createdAt": _iso(NOW - timedelta(days=7)),
        "isRead": True,
        "targetUrl": "/catalog/dune",
    },
]

READER_SETTINGS: dict[str, Any] = {
    "defaultFont": "Inter",
    "fontSize": 18,
    "readingMode": "scroll",
    "emailNotifications": True,
}

PROFILE_STATS = [
    {"key": "booksRead", "value": "142", "label": "Прочитано книг"},
    {"key": "readingHours", "value": "842", "label": "Часов чтения"},
    {"key": "reviews", "value": "56", "label": "Оставлено отзывов"},
    {"key": "karma", "value": "2,450", "label": "Карма"},
]

PROFILE_ACHIEVEMENTS = [
    {
        "id": "ach-1",
        "title": "Кибер-Архивариус",
        "subtitle": "Прочитано 50 sci-fi книг",
        "badge": "Легендарное",
        "tone": "teal",
        "icon": "shield",
        "unlockedAt": _iso(NOW - timedelta(days=120)),
    },
    {
        "id": "ach-2",
        "title": "Ночная Сова",
        "subtitle": "Чтение после 2:00 ночи 7 дней подряд",
        "badge": "Редкое",
        "tone": "bronze",
        "icon": "star",
        "unlockedAt": _iso(NOW - timedelta(days=40)),
    },
    {
        "id": "ach-3",
        "title": "Полиглот ИИ",
        "subtitle": "Прочитано на 3 разных языках перевода",
        "badge": "Эпическое",
        "tone": "violet",
        "icon": "ribbon",
        "unlockedAt": _iso(NOW - timedelta(days=12)),
    },
    {
        "id": "ach-4",
        "title": "Секретное достижение",
        "subtitle": "Остаётся скрытым до выполнения условий",
        "badge": "",
        "tone": "ghost",
        "icon": "lock",
        "unlockedAt": None,
    },
]

PROFILE_ACTIVITY = [
    {
        "id": "act-1",
        "type": "read",
        "text": "Прочитал главу 14 «Нейромант»",
        "meta": "Системная метка: READ_LOG_4042",
        "createdAt": _iso(NOW - timedelta(hours=2)),
    },
    {
        "id": "act-2",
        "type": "comment",
        "text": "Оставил комментарий к «Дюне»",
        "meta": "Системная метка: COMMENT_LOG_5468",
        "createdAt": _iso(NOW - timedelta(days=1)),
    },
    {
        "id": "act-3",
        "type": "favorite",
        "text": "Добавил в избранное «Мечтают ли андроиды об электроовцах?»",
        "meta": "Системная метка: FAVORITE_LOG_6899",
        "createdAt": _iso(NOW - timedelta(days=3)),
    },
    {
        "id": "act-4",
        "type": "complete",
        "text": "Завершил чтение «Основание»",
        "meta": "Системная метка: COMPLETE_LOG_4397",
        "createdAt": _iso(NOW - timedelta(days=7)),
    },
]

TRANSLATION_QUEUE: list[dict[str, Any]] = [
    {
        "id": "job-live-1",
        "title": "The Veil",
        "author": None,
        "sourceLanguage": "EN",
        "targetLanguage": "RU",
        "fileName": "The_Veil.epub",
        "fileSize": 3_100_000,
        "status": "processing",
        "progress": 64,
        "queuePosition": 1,
        "createdAt": _iso(NOW - timedelta(minutes=15)),
        "completedAt": None,
        "resultBookId": None,
    },
    {
        "id": "job-live-2",
        "title": "Otter City",
        "author": None,
        "sourceLanguage": "EN",
        "targetLanguage": "RU",
        "fileName": "Otter_City.docx",
        "fileSize": 2_000_000,
        "status": "queued",
        "progress": 22,
        "queuePosition": 2,
        "createdAt": _iso(NOW - timedelta(minutes=8)),
        "completedAt": None,
        "resultBookId": None,
    },
]

TRANSLATION_HISTORY: list[dict[str, Any]] = [
    {
        "id": "job-h-1",
        "title": "Omniscient Reader's Viewpoint",
        "author": None,
        "sourceLanguage": "KR",
        "targetLanguage": "RU",
        "fileName": "omniscient_reader.epub",
        "fileSize": 4_400_000,
        "status": "completed",
        "progress": 100,
        "queuePosition": None,
        "createdAt": _iso(NOW - timedelta(days=1, hours=2)),
        "completedAt": _iso(NOW - timedelta(days=1)),
        "resultBookId": "omniscient-reader",
    },
    {
        "id": "job-h-2",
        "title": "The Beginning After The End",
        "author": None,
        "sourceLanguage": "EN",
        "targetLanguage": "RU",
        "fileName": "tbate.pdf",
        "fileSize": 8_800_000,
        "status": "completed",
        "progress": 100,
        "queuePosition": None,
        "createdAt": _iso(NOW - timedelta(days=3, hours=4)),
        "completedAt": _iso(NOW - timedelta(days=3)),
        "resultBookId": None,
    },
    {
        "id": "job-h-3",
        "title": "Lord of the Mysteries",
        "author": None,
        "sourceLanguage": "CN",
        "targetLanguage": "RU",
        "fileName": "lotm.docx",
        "fileSize": 6_700_000,
        "status": "completed",
        "progress": 100,
        "queuePosition": None,
        "createdAt": _iso(NOW - timedelta(days=7, hours=2)),
        "completedAt": _iso(NOW - timedelta(days=7)),
        "resultBookId": None,
    },
]

SUPPORT_TICKETS: list[dict[str, Any]] = []

TERMS_DOCUMENT = {
    "slug": "terms",
    "title": "Пользовательское соглашение",
    "version": "0.9-draft",
    "publishedAt": None,
    "updatedAt": _iso(NOW - timedelta(days=4)),
    "content": (
        "WN-Lab предоставляет доступ к каталогу произведений, инструментам чтения и сервисам "
        "перевода. Пользователь обязуется использовать платформу добросовестно, не нарушать "
        "авторские права и не публиковать вредоносный или незаконный контент.\n\n"
        "Команда проекта оставляет за собой право ограничивать доступ к функциям сервиса при "
        "подозрительной активности, нарушении правил или технической необходимости.\n\n"
        "Черновик документа опубликован для интеграции интерфейса и будет заменён на финальную "
        "юридическую версию после утверждения."
    ),
}


def _copy(data: Any) -> Any:
    return deepcopy(data)


def _book(slug: str) -> dict[str, Any]:
    book = BOOKS_BY_SLUG.get(slug)
    if book is None:
        raise KeyError(slug)
    return book


def _find_book_by_id(book_id: str) -> dict[str, Any]:
    book = BOOKS_BY_ID.get(book_id)
    if book is None:
        raise KeyError(book_id)
    return book


def _public_user(user: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": user["id"],
        "username": user["username"],
        "displayName": user["displayName"],
        "email": user["email"],
        "avatarUrl": user["avatarUrl"],
        "coverUrl": user["coverUrl"],
        "bio": user["bio"],
        "level": user["level"],
        "streakDays": user["streakDays"],
        "favoriteGenre": user["favoriteGenre"],
        "registeredAt": user["registeredAt"],
    }


def register_user(
    username: str,
    display_name: str,
    email: str,
    password: str,
) -> dict[str, Any]:
    email_key = email.lower().strip()
    if email_key in USERS_BY_EMAIL:
        raise ValueError("email_already_exists")

    user_id = f"user-{uuid4().hex[:10]}"
    user = {
        "id": user_id,
        "username": username.strip(),
        "displayName": display_name.strip(),
        "email": email.strip(),
        "avatarUrl": None,
        "coverUrl": None,
        "bio": "Новый читатель WN-Lab.",
        "level": 1,
        "streakDays": 0,
        "favoriteGenre": None,
        "registeredAt": _iso(datetime.now(UTC)),
        "password": password,
    }
    USERS_BY_ID[user_id] = user
    USERS_BY_EMAIL[email_key] = user_id
    token = secrets.token_urlsafe(32)
    SESSION_TOKENS[token] = user_id
    return {"token": token, "user": _copy(_public_user(user))}


def login_user(email: str, password: str) -> dict[str, Any]:
    user_id = USERS_BY_EMAIL.get(email.lower().strip())
    if user_id is None:
        raise ValueError("invalid_credentials")
    user = USERS_BY_ID[user_id]
    if user["password"] != password:
        raise ValueError("invalid_credentials")
    token = secrets.token_urlsafe(32)
    SESSION_TOKENS[token] = user_id
    return {"token": token, "user": _copy(_public_user(user))}


def get_user_by_token(token: str) -> dict[str, Any] | None:
    user_id = SESSION_TOKENS.get(token)
    if user_id is None:
        return None
    user = USERS_BY_ID.get(user_id)
    if user is None:
        return None
    return user


def revoke_token(token: str) -> None:
    SESSION_TOKENS.pop(token, None)


def _user_state(slug: str) -> dict[str, Any]:
    book = _book(slug)
    categories = LIBRARY_STATE.get(book["id"], {}).get("categories", set())
    return {
        "isFavorite": "favorites" in categories,
        "inLibrary": book["id"] in LIBRARY_STATE,
        "progress": _copy(READING_PROGRESS.get(book["id"])),
    }


def get_home_data() -> dict[str, Any]:
    continue_reading = []
    for book_id, progress in READING_PROGRESS.items():
        book = _find_book_by_id(book_id)
        chapter_number = progress["chapterNumber"]
        continue_reading.append(
            {
                "bookId": book_id,
                "slug": book["slug"],
                "title": book["title"],
                "chapterTitle": f"Глава {chapter_number}",
                "chapterNumber": chapter_number,
                "progress": progress["progressPercent"],
                "coverUrl": book["coverUrl"],
                "readUrl": f"/catalog/{book['slug']}/read?chapter={chapter_number}",
            }
        )

    popular = sorted(BOOKS, key=lambda item: item["rating"], reverse=True)[:6]
    latest = [
        {
            "bookId": "three-body",
            "slug": "three-body",
            "title": "Задача трёх тел",
            "coverUrl": BOOKS_BY_ID["three-body"]["coverUrl"],
            "chapterTitle": "Глава 12",
            "chapterNumber": 12,
            "publishedAt": _iso(NOW - timedelta(hours=2)),
        },
        {
            "bookId": "androids",
            "slug": "androids",
            "title": "Мечтают ли андроиды об электроовцах?",
            "coverUrl": BOOKS_BY_ID["androids"]["coverUrl"],
            "chapterTitle": "Глава 8",
            "chapterNumber": 8,
            "publishedAt": _iso(NOW - timedelta(hours=5)),
        },
        {
            "bookId": "hyperion",
            "slug": "hyperion",
            "title": "Гиперион",
            "coverUrl": BOOKS_BY_ID["hyperion"]["coverUrl"],
            "chapterTitle": "Глава 24",
            "chapterNumber": 24,
            "publishedAt": _iso(NOW - timedelta(days=1)),
        },
    ]
    return {
        "continueReading": continue_reading,
        "popularThisWeek": [
            {
                "bookId": book["id"],
                "slug": book["slug"],
                "title": book["title"],
                "author": book["author"],
                "rating": book["rating"],
                "coverUrl": book["coverUrl"],
            }
            for book in popular
        ],
        "latestUpdates": latest,
        "featuredCollection": {
            "id": "golden-cyberpunk-age",
            "title": "Золотой век киберпанка",
            "eyebrow": "Тематическая подборка",
            "description": (
                "Коллекция произведений, заложивших основы жанра: от канонических романов "
                "до архивных переводов."
            ),
            "coverUrl": BOOKS_BY_ID["neuromant"]["heroImageUrl"],
            "href": "/catalog?genre=Киберпанк",
        },
    }


def list_books(
    q: str | None = None,
    genre: str | None = None,
    status: str | None = None,
    sort: str = "popular",
    page: int = 1,
    page_size: int = 24,
) -> dict[str, Any]:
    items = BOOKS[:]
    if q:
        q_lower = q.lower()
        items = [
            book
            for book in items
            if q_lower in book["title"].lower()
            or q_lower in book["author"].lower()
            or any(q_lower in tag.lower() for tag in book["tags"])
        ]
    if genre:
        items = [book for book in items if genre in book["genres"]]
    if status:
        items = [book for book in items if book["status"] == status]

    if sort == "rating":
        items.sort(key=lambda book: book["rating"], reverse=True)
    elif sort == "title":
        items.sort(key=lambda book: book["title"])
    elif sort == "updated":
        items.sort(key=lambda book: book["translationProgress"], reverse=True)
    else:
        items.sort(key=lambda book: (book["rating"], book["translationProgress"]), reverse=True)

    total = len(items)
    start = max(page - 1, 0) * page_size
    end = start + page_size
    return {
        "items": _copy(items[start:end]),
        "page": page,
        "pageSize": page_size,
        "total": total,
    }


def get_book_detail(slug: str) -> dict[str, Any]:
    book = _book(slug)
    chapters = CHAPTERS_BY_BOOK.get(book["id"], [])
    return {
        "book": _copy(book),
        "userState": _user_state(slug),
        "chapters": [
            {
                "id": chapter["id"],
                "bookId": chapter["bookId"],
                "number": chapter["number"],
                "title": chapter["title"],
                "slug": chapter["slug"],
                "status": chapter["status"],
                "publishedAt": chapter["publishedAt"],
            }
            for chapter in chapters
        ],
    }


def set_book_favorite(slug: str, is_favorite: bool) -> dict[str, bool]:
    book = _book(slug)
    state = LIBRARY_STATE.setdefault(book["id"], {"categories": set(), "addedAt": _iso(NOW)})
    categories: set[str] = state["categories"]
    if is_favorite:
        categories.add("favorites")
    else:
        categories.discard("favorites")
    return {"isFavorite": is_favorite}


def get_reader_chapter(slug: str, chapter_number: int) -> dict[str, Any]:
    book = _book(slug)
    chapters = CHAPTERS_BY_BOOK.get(book["id"], [])
    chapter = next((item for item in chapters if item["number"] == chapter_number), None)
    if chapter is None:
        raise KeyError(f"{slug}:{chapter_number}")
    numbers = [item["number"] for item in chapters]
    index = numbers.index(chapter_number)
    previous_number = numbers[index - 1] if index > 0 else None
    next_number = numbers[index + 1] if index < len(numbers) - 1 else None
    return {
        "book": {
            "id": book["id"],
            "slug": book["slug"],
            "title": book["title"],
            "author": book["author"],
        },
        "chapter": {
            "id": chapter["id"],
            "number": chapter["number"],
            "title": chapter["title"],
            "content": chapter["content"],
            "previousChapterNumber": previous_number,
            "nextChapterNumber": next_number,
        },
        "progress": _copy(READING_PROGRESS.get(book["id"])),
        "chapterIndexText": f"Глава {chapter['number']} из {len(chapters)}",
    }


def update_reader_progress(
    slug: str,
    chapter_number: int,
    progress_percent: int,
    scroll_offset: int | None,
) -> dict[str, Any]:
    book = _book(slug)
    chapter = next(
        item for item in CHAPTERS_BY_BOOK.get(book["id"], []) if item["number"] == chapter_number
    )
    progress = {
        "bookId": book["id"],
        "chapterId": chapter["id"],
        "chapterNumber": chapter_number,
        "progressPercent": progress_percent,
        "scrollOffset": scroll_offset,
        "updatedAt": _iso(datetime.now(UTC)),
    }
    READING_PROGRESS[book["id"]] = progress
    LIBRARY_STATE.setdefault(book["id"], {"categories": {"reading"}, "addedAt": _iso(NOW)})
    LIBRARY_STATE[book["id"]]["categories"].add("reading")
    return _copy(progress)


def list_chapters(slug: str) -> dict[str, Any]:
    return {"items": get_book_detail(slug)["chapters"]}


def _library_item(book_id: str) -> dict[str, Any]:
    book = _find_book_by_id(book_id)
    state = LIBRARY_STATE[book_id]
    return {
        "book": _copy(book),
        "progress": _copy(READING_PROGRESS.get(book_id)),
        "categories": sorted(state["categories"]),
        "addedAt": state["addedAt"],
    }


def get_library(category: str = "all", q: str | None = None, page: int = 1, page_size: int = 24) -> dict[str, Any]:
    items = [_library_item(book_id) for book_id in LIBRARY_STATE]
    if category != "all":
        items = [item for item in items if category in item["categories"]]
    if q:
        q_lower = q.lower()
        items = [
            item
            for item in items
            if q_lower in item["book"]["title"].lower()
            or q_lower in item["book"]["author"].lower()
        ]
    total = len(items)
    start = max(page - 1, 0) * page_size
    end = start + page_size
    return {
        "category": category,
        "items": items[start:end],
        "page": page,
        "pageSize": page_size,
        "total": total,
    }


def add_to_library(book_id: str) -> dict[str, Any]:
    _find_book_by_id(book_id)
    LIBRARY_STATE.setdefault(book_id, {"categories": {"reading"}, "addedAt": _iso(datetime.now(UTC))})
    return _library_item(book_id)


def remove_from_library(book_id: str) -> dict[str, bool]:
    LIBRARY_STATE.pop(book_id, None)
    READING_PROGRESS.pop(book_id, None)
    return {"removed": True}


def update_library_item(book_id: str, is_favorite: bool | None, is_completed: bool | None) -> dict[str, Any]:
    _find_book_by_id(book_id)
    state = LIBRARY_STATE.setdefault(book_id, {"categories": set(), "addedAt": _iso(datetime.now(UTC))})
    categories: set[str] = state["categories"]
    if is_favorite is not None:
        if is_favorite:
            categories.add("favorites")
        else:
            categories.discard("favorites")
    if is_completed is not None:
        if is_completed:
            categories.add("completed")
            categories.discard("reading")
            if book_id in READING_PROGRESS:
                READING_PROGRESS[book_id]["progressPercent"] = 100
        else:
            categories.discard("completed")
    return _library_item(book_id)


def get_profile(user: dict[str, Any] | None = None) -> dict[str, Any]:
    current_user = user or DEMO_USER
    return {
        "user": _copy(_public_user(current_user)),
        "stats": _copy(PROFILE_STATS),
        "achievements": _copy(PROFILE_ACHIEVEMENTS),
        "activity": _copy(PROFILE_ACTIVITY),
    }


def update_profile(
    user: dict[str, Any],
    display_name: str | None,
    bio: str | None,
    favorite_genre: str | None,
) -> dict[str, Any]:
    if display_name is not None:
        user["displayName"] = display_name
    if bio is not None:
        user["bio"] = bio
    if favorite_genre is not None:
        user["favoriteGenre"] = favorite_genre
    return _copy(_public_user(user))


def list_notifications(status: str = "all", page: int = 1, page_size: int = 24) -> dict[str, Any]:
    items = NOTIFICATIONS[:]
    if status == "read":
        items = [item for item in items if item["isRead"]]
    elif status == "unread":
        items = [item for item in items if not item["isRead"]]
    unread_count = sum(1 for item in NOTIFICATIONS if not item["isRead"])
    total = len(items)
    start = max(page - 1, 0) * page_size
    end = start + page_size
    return {
        "items": _copy(items[start:end]),
        "unreadCount": unread_count,
        "page": page,
        "pageSize": page_size,
        "total": total,
    }


def update_notification(notification_id: str, is_read: bool) -> dict[str, Any]:
    notification = next(item for item in NOTIFICATIONS if item["id"] == notification_id)
    notification["isRead"] = is_read
    return _copy(notification)


def mark_all_notifications_read() -> dict[str, int]:
    updated = 0
    for notification in NOTIFICATIONS:
        if not notification["isRead"]:
            notification["isRead"] = True
            updated += 1
    return {"updated": updated, "unreadCount": 0}


def get_settings() -> dict[str, Any]:
    return {"reader": _copy(READER_SETTINGS)}


def update_settings(reader: dict[str, Any]) -> dict[str, Any]:
    READER_SETTINGS.update(reader)
    return {"reader": _copy(READER_SETTINGS)}


def get_translation_dashboard() -> dict[str, Any]:
    return {
        "engine": {"name": "Архивариус Engine", "version": "4.2", "status": "online"},
        "queue": _copy(TRANSLATION_QUEUE),
        "history": _copy(TRANSLATION_HISTORY),
        "serverStatus": {
            "activeNodes": 12,
            "totalNodes": 12,
            "queuedFiles": len(TRANSLATION_QUEUE) + 426,
            "averageWaitSeconds": 252,
        },
        "userPlan": {"name": "pro", "hasPriorityQueue": True},
    }


def create_translation_job(
    title: str,
    author: str | None,
    source_language: str,
    target_language: str,
    file_name: str,
    file_size: int,
) -> dict[str, Any]:
    job = {
        "id": f"job-{uuid4().hex[:10]}",
        "title": title,
        "author": author,
        "sourceLanguage": source_language,
        "targetLanguage": target_language,
        "fileName": file_name,
        "fileSize": file_size,
        "status": "queued",
        "progress": 0,
        "queuePosition": len(TRANSLATION_QUEUE) + 1,
        "createdAt": _iso(datetime.now(UTC)),
        "completedAt": None,
        "resultBookId": None,
    }
    TRANSLATION_QUEUE.append(job)
    return _copy(job)


def list_translation_jobs(status: str | None = None, page: int = 1, page_size: int = 24) -> dict[str, Any]:
    items = TRANSLATION_QUEUE + TRANSLATION_HISTORY
    if status:
        items = [item for item in items if item["status"] == status]
    total = len(items)
    start = max(page - 1, 0) * page_size
    end = start + page_size
    return {
        "items": _copy(items[start:end]),
        "page": page,
        "pageSize": page_size,
        "total": total,
    }


def get_translation_job(job_id: str) -> dict[str, Any]:
    for job in TRANSLATION_QUEUE + TRANSLATION_HISTORY:
        if job["id"] == job_id:
            return _copy(job)
    raise KeyError(job_id)


def cancel_translation_job(job_id: str) -> dict[str, bool]:
    for index, job in enumerate(TRANSLATION_QUEUE):
        if job["id"] == job_id:
            TRANSLATION_QUEUE.pop(index)
            return {"cancelled": True}
    return {"cancelled": False}


def get_support_page() -> dict[str, Any]:
    return {
        "page": {
            "eyebrow": "Поддержка",
            "title": "Связь с командой проекта",
            "description": (
                "Сообщайте об ошибках, проблемах доступа, вопросах по контенту и любых "
                "других ситуациях, где вам нужна помощь команды WN-Lab."
            ),
        },
        "ticketTypes": [
            {"value": "complaint", "label": "Жалоба", "description": "Спорный контент или нарушение правил."},
            {"value": "bug", "label": "Ошибка", "description": "Проблемы в интерфейсе, ридере или переводе."},
            {"value": "access", "label": "Доступ", "description": "Проблемы с доступом к функциям или материалам."},
            {"value": "copyright", "label": "Авторское право", "description": "Запросы по правам и удалению."},
            {"value": "other", "label": "Другое", "description": "Любой вопрос, который не подходит под категории выше."},
        ],
        "contact": {
            "email": "support@wn-lab.io",
            "enabled": True,
            "note": "Среднее время ответа команды поддержки: до 24 часов.",
        },
        "status": {
            "formEnabled": True,
            "note": "Форма активна и уже сохраняет обращения на сервере demo-окружения.",
        },
    }


def create_support_ticket(ticket_type: str, subject: str, message: str, email: str | None) -> dict[str, Any]:
    ticket = {
        "id": f"ticket-{uuid4().hex[:8]}",
        "type": ticket_type,
        "subject": subject,
        "message": message,
        "email": email,
        "status": "new",
        "createdAt": _iso(datetime.now(UTC)),
        "updatedAt": _iso(datetime.now(UTC)),
    }
    SUPPORT_TICKETS.insert(0, ticket)
    return _copy(ticket)


def get_my_support_tickets() -> dict[str, Any]:
    return {"items": _copy(SUPPORT_TICKETS), "total": len(SUPPORT_TICKETS)}


def get_terms() -> dict[str, Any]:
    return {"document": _copy(TERMS_DOCUMENT)}


def search(query: str, scope: str = "all", limit: int = 8) -> dict[str, Any]:
    q_lower = query.lower()
    items = []
    for book in BOOKS:
        if q_lower in book["title"].lower() or q_lower in book["author"].lower():
            if scope in {"all", "books", "authors"}:
                items.append(
                    {
                        "type": "book",
                        "id": book["id"],
                        "title": book["title"],
                        "subtitle": book["author"],
                        "coverUrl": book["coverUrl"],
                        "href": book["href"],
                    }
                )
    if scope in {"all", "library"}:
        for book_id in LIBRARY_STATE:
            book = _find_book_by_id(book_id)
            if q_lower in book["title"].lower():
                items.append(
                    {
                        "type": "book",
                        "id": book["id"],
                        "title": f"{book['title']} · Библиотека",
                        "subtitle": book["author"],
                        "coverUrl": book["coverUrl"],
                        "href": "/library",
                    }
                )
    return {"items": items[:limit]}
