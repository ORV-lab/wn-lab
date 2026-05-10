"use client";

import { useState, useTransition } from "react";
import { AppIcon } from "@/components/shared/app-icon";
import { updateReaderProgress } from "@/lib/api";

type SaveProgressButtonProps = {
  slug: string;
  chapterNumber: number;
  progressPercent: number;
};

export function SaveProgressButton({
  slug,
  chapterNumber,
  progressPercent,
}: SaveProgressButtonProps) {
  const [label, setLabel] = useState("Сохранить прогресс");
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="reader-topbar__button"
      type="button"
      aria-label="Сохранить прогресс"
      disabled={isPending}
      title={label}
      onClick={() => {
        startTransition(async () => {
          try {
            await updateReaderProgress(slug, chapterNumber, {
              progressPercent,
              scrollOffset: null,
            });
            setLabel("Сохранено");
          } catch {
            setLabel("Ошибка");
          }
        });
      }}
    >
      <AppIcon name="bookmark" className="reader-icon" />
    </button>
  );
}
