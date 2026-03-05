const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Пример получения токена (например, из localStorage, cookie или zustand)
function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export interface ApiError extends Error {
  status: number;
  info?: any;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${path}`;
  const headers = new Headers(options.headers || {});

  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Автоматически добавляем Content-Type, если тело - строка
  if (options.body && typeof options.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = new Error(`Request to ${path} failed with status ${response.status}`) as ApiError;
    error.status = response.status;
    try {
      const errorData = await response.json();
      error.info = errorData;
    } catch {
      error.info = { message: response.statusText };
    }
    throw error;
  }

  // Если ожидается NoContent
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
