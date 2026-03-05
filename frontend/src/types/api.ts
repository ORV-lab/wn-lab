export type Role = "reader" | "translator" | "admin";

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  createdAt: string;
}

export type NovelStatus = "ongoing" | "completed" | "hiatus";

export interface Novel {
  id: string;
  slug: string;
  title: string;
  description?: string;
  originalLang: string;
  status: NovelStatus;
  coverUrl?: string;
  ownerId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type ChapterStatus = "raw" | "translating" | "draft" | "published";

export interface Chapter {
  id: string;
  novelId: string;
  number: number;
  title?: string;
  sourceKey: string;
  status: ChapterStatus;
  createdAt: string;
}
