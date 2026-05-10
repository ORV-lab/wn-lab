import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL, SESSION_COOKIE_NAME } from "@/lib/config";
import type {
  AuthSession,
  LibraryResponse,
  NotificationsResponse,
  ProfileResponse,
  SettingsResponse,
  TranslationDashboardResponse,
} from "@/lib/types";

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

async function requestServerJson<T>(
  path: string,
  init?: RequestInit,
  params?: Record<string, string | number | undefined | null>,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const headers = new Headers(init?.headers ?? {});

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path, params), {
    ...init,
    cache: "no-store",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Server API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getServerSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  try {
    return await requestServerJson<AuthSession>("/api/v1/auth/me");
  } catch {
    return null;
  }
}

export async function requireServerSession(nextPath: string) {
  const session = await getServerSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
  return session;
}

export function getAuthenticatedLibrary(category: "all" | "reading" | "favorites" | "completed") {
  return requestServerJson<LibraryResponse>("/api/v1/me/library", undefined, { category });
}

export function getAuthenticatedProfile() {
  return requestServerJson<ProfileResponse>("/api/v1/me/profile");
}

export function getAuthenticatedNotifications() {
  return requestServerJson<NotificationsResponse>("/api/v1/me/notifications");
}

export function getAuthenticatedSettings() {
  return requestServerJson<SettingsResponse>("/api/v1/me/settings");
}

export function getAuthenticatedTranslationDashboard() {
  return requestServerJson<TranslationDashboardResponse>("/api/v1/translation/dashboard");
}
