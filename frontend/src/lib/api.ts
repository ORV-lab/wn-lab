import type {
  AuthResponse,
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
import { API_BASE_URL, SESSION_COOKIE_NAME } from "@/lib/config";

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
  const headers = new Headers(init?.headers ?? {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const token =
    typeof document === "undefined"
      ? null
      : document.cookie
          .split("; ")
          .find((item) => item.startsWith(`${SESSION_COOKIE_NAME}=`))
          ?.split("=")[1];
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${decodeURIComponent(token)}`);
  }

  const response = await fetch(buildUrl(path, params), {
    ...init,
    cache: "no-store",
    headers,
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
  const headers = new Headers();
  const token =
    typeof document === "undefined"
      ? null
      : document.cookie
          .split("; ")
          .find((item) => item.startsWith(`${SESSION_COOKIE_NAME}=`))
          ?.split("=")[1];
  if (token) {
    headers.set("Authorization", `Bearer ${decodeURIComponent(token)}`);
  }

  const response = await fetch(buildUrl("/api/v1/translation/jobs"), {
    method: "POST",
    body: formData,
    headers,
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

export async function login(payload: { email: string; password: string }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return (await response.json()) as AuthResponse;
}

export async function register(payload: {
  username: string;
  displayName: string;
  email: string;
  password: string;
}) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return (await response.json()) as AuthResponse;
}

export async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
}
