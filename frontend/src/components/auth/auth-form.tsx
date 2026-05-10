"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { login, register } from "@/lib/api";

type AuthFormProps = {
  mode: "login" | "register";
  nextPath: string;
};

export function AuthForm({ mode, nextPath }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(mode === "login" ? "alex.reader@wn-lab.io" : "");
  const [password, setPassword] = useState(mode === "login" ? "demo12345" : "");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isLogin = mode === "login";

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <p className="auth-card__eyebrow">{isLogin ? "Вход" : "Регистрация"}</p>
        <h1 className="auth-card__title">{isLogin ? "Войти в WN-Lab" : "Создать аккаунт"}</h1>
        <p className="auth-card__text">
          {isLogin
            ? "Войдите, чтобы открыть библиотеку, профиль и персональные функции."
            : "Зарегистрируйтесь, чтобы сохранять прогресс чтения и пользоваться личным пространством."}
        </p>
      </div>

      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          setError("");
          startTransition(async () => {
            try {
              if (isLogin) {
                await login({ email, password });
              } else {
                await register({ username, displayName, email, password });
              }
              router.push(nextPath);
              router.refresh();
            } catch {
              setError(
                isLogin
                  ? "Не удалось войти. Проверьте email и пароль."
                  : "Не удалось создать аккаунт. Возможно, этот email уже занят.",
              );
            }
          });
        }}
      >
        {!isLogin ? (
          <>
            <label className="auth-field">
              <span>Username</span>
              <input value={username} onChange={(event) => setUsername(event.target.value)} required minLength={3} />
            </label>
            <label className="auth-field">
              <span>Отображаемое имя</span>
              <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} required minLength={2} />
            </label>
          </>
        ) : null}

        <label className="auth-field">
          <span>Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <label className="auth-field">
          <span>Пароль</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
        </label>

        {error ? <p className="auth-error">{error}</p> : null}

        <button className="button button--primary auth-submit" type="submit" disabled={isPending}>
          {isLogin ? "Войти" : "Создать аккаунт"}
        </button>
      </form>

      <div className="auth-card__footer">
        {isLogin ? (
          <p className="auth-card__text">
            Нет аккаунта? <Link href={`/register?next=${encodeURIComponent(nextPath)}`}>Зарегистрироваться</Link>
          </p>
        ) : (
          <p className="auth-card__text">
            Уже есть аккаунт? <Link href={`/login?next=${encodeURIComponent(nextPath)}`}>Войти</Link>
          </p>
        )}
        {isLogin ? <p className="auth-card__hint">Демо-вход: alex.reader@wn-lab.io / demo12345</p> : null}
      </div>
    </div>
  );
}
