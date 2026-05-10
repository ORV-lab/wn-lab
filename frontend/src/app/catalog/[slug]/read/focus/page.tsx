import { notFound } from "next/navigation";
import { ReaderFocusShell } from "@/components/reader/reader-focus-shell";
import { getReaderChapter } from "@/lib/api";

type ReaderFocusPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ chapter?: string }>;
};

export default async function ReaderFocusPage({ params, searchParams }: ReaderFocusPageProps) {
  const { slug } = await params;
  const { chapter } = await searchParams;
  const chapterNumber = Number(chapter ?? "1");

  try {
    const data = await getReaderChapter(slug, Number.isFinite(chapterNumber) ? chapterNumber : 1);
    return <ReaderFocusShell data={data} />;
  } catch {
    notFound();
  }
}
