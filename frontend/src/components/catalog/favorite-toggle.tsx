"use client";

import { useState, useTransition } from "react";
import { AppIcon } from "@/components/shared/app-icon";
import { toggleFavorite } from "@/lib/api";

type FavoriteToggleProps = {
  slug: string;
  initialValue: boolean;
};

export function FavoriteToggle({ slug, initialValue }: FavoriteToggleProps) {
  const [isFavorite, setIsFavorite] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="detail-icon-button"
      type="button"
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const nextValue = !isFavorite;
          setIsFavorite(nextValue);
          try {
            await toggleFavorite(slug, nextValue);
          } catch {
            setIsFavorite(!nextValue);
          }
        });
      }}
    >
      <AppIcon name="heart" className="detail-icon" />
    </button>
  );
}
