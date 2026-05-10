export type Book = {
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

export type Chapter = {
  id: string;
  bookId: string;
  number: number;
  title: string;
  slug: string;
  status: "draft" | "translating" | "translated" | "published";
  publishedAt: string | null;
};

export type ReadingProgress = {
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  progressPercent: number;
  scrollOffset: number | null;
  updatedAt: string;
};

export type LibraryItem = {
  book: Book;
  progress: ReadingProgress | null;
  categories: Array<"reading" | "favorites" | "completed">;
  addedAt: string;
};

export type Notification = {
  id: string;
  type: "new_chapter" | "system" | "achievement" | "comment_reply";
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  targetUrl: string | null;
};

export type ReaderSettings = {
  defaultFont: "Inter" | "Newsreader" | "Tinos" | "Noto Sans";
  fontSize: number;
  readingMode: "scroll" | "paged";
  emailNotifications: boolean;
};

export type TranslationJob = {
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

export type SupportTicket = {
  id: string;
  type: "complaint" | "bug" | "access" | "copyright" | "other";
  subject: string;
  message: string;
  email: string | null;
  status: "new" | "in_review" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
};

export type User = {
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

export type HomeResponse = {
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

export type BooksResponse = {
  items: Book[];
  page: number;
  pageSize: number;
  total: number;
};

export type BookDetailResponse = {
  book: Book;
  userState: {
    isFavorite: boolean;
    inLibrary: boolean;
    progress: ReadingProgress | null;
  } | null;
  chapters: Chapter[];
};

export type ReaderChapterResponse = {
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

export type LibraryResponse = {
  category: "all" | "reading" | "favorites" | "completed";
  items: LibraryItem[];
  page: number;
  pageSize: number;
  total: number;
};

export type ProfileResponse = {
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

export type NotificationsResponse = {
  items: Notification[];
  unreadCount: number;
  page: number;
  pageSize: number;
  total: number;
};

export type SettingsResponse = {
  reader: ReaderSettings;
};

export type TranslationDashboardResponse = {
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

export type SupportPageResponse = {
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

export type TermsResponse = {
  document: {
    slug: "terms";
    title: string;
    version: string;
    publishedAt: string | null;
    updatedAt: string | null;
    content: string;
  };
};

export type AuthSession = {
  user: User;
};

export type AuthResponse = {
  token: string;
  user: User;
};
