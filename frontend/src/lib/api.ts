import type {
  BookDetailResponse,
  BooksResponse,
  HomeResponse,
  LibraryResponse,
  NotificationsResponse,
  ProfileResponse,
  ReaderChapterResponse,
  SettingsResponse,
  SupportPageResponse,
  TermsResponse,
  TranslationDashboardResponse,
} from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "http://127.0.0.1:8000";

function buildUrl(path: string, params?: Record<string, string | number | undefined | null>) {
  const url = new URL(path, API_BASE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function requestJson<T>(path: string, init?: RequestInit, params?: Record<string, string | number | undefined | null>): Promise<T> {
  const response = await fetch(buildUrl(path, params), {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export function getHomePageData() {
  return requestJson<HomeResponse>("/api/v1/home");
}

export function getCatalogBooks(params?: { q?: string; genre?: string; status?: string; sort?: string }) {
  return requestJson<BooksResponse>("/api/v1/books", undefined, params);
}

export function getBookDetail(slug: string) {
  return requestJson<BookDetailResponse>(`/api/v1/books/${slug}`);
}

export function getReaderChapter(slug: string, chapterNumber: number) {
  return requestJson<ReaderChapterResponse>(`/api/v1/books/${slug}/chapters/${chapterNumber}`);
}

export function updateReaderProgress(slug: string, chapterNumber: number, payload: { progressPercent: number; scrollOffset: number | null }) {
  return requestJson(`/api/v1/books/${slug}/chapters/${chapterNumber}/progress`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function toggleFavorite(slug: string, isFavorite: boolean) {
  return requestJson<{ isFavorite: boolean }>(`/api/v1/books/${slug}/favorite`, {
    method: isFavorite ? "POST" : "DELETE",
  });
}

export function getLibrary(category: "all" | "reading" | "favorites" | "completed") {
  return requestJson<LibraryResponse>("/api/v1/me/library", undefined, { category });
}

export function getProfile() {
  return requestJson<ProfileResponse>("/api/v1/me/profile");
}

export function getNotifications() {
  return requestJson<NotificationsResponse>("/api/v1/me/notifications");
}

export function markAllNotificationsRead() {
  return requestJson<{ updated: number; unreadCount: number }>("/api/v1/me/notifications/mark-all-read", {
    method: "POST",
  });
}

export function getSettings() {
  return requestJson<SettingsResponse>("/api/v1/me/settings");
}

export function saveSettings(reader: SettingsResponse["reader"]) {
  return requestJson<SettingsResponse>("/api/v1/me/settings", {
    method: "PATCH",
    body: JSON.stringify({ reader }),
  });
}

export function getTranslationDashboard() {
  return requestJson<TranslationDashboardResponse>("/api/v1/translation/dashboard");
}

export async function createTranslationJob(formData: FormData) {
  const response = await fetch(buildUrl("/api/v1/translation/jobs"), {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function getSupportPage() {
  return requestJson<SupportPageResponse>("/api/v1/support/page");
}

export function createSupportTicket(payload: {
  type: string;
  subject: string;
  message: string;
  email: string | null;
}) {
  return requestJson("/api/v1/support/tickets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getTerms() {
  return requestJson<TermsResponse>("/api/v1/legal/terms");
}
