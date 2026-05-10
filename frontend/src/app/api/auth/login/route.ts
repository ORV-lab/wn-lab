import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE_URL, SESSION_COOKIE_NAME } from "@/lib/config";
import type { AuthResponse } from "@/lib/types";

export async function POST(request: Request) {
  const payload = await request.json();
  const response = await fetch(new URL("/api/v1/auth/login", API_BASE_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: response.status });
  }

  const data = (await response.json()) as AuthResponse;
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, data.token, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(data);
}
