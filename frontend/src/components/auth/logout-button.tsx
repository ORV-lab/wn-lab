"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logout } from "@/lib/api";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="topbar-auth__button topbar-auth__button--ghost"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await logout();
          router.push("/login");
          router.refresh();
        });
      }}
    >
      Выйти
    </button>
  );
}
