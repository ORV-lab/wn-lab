import { notFound } from "next/navigation";
import { ReaderShell } from "@/components/reader/reader-shell";
import { getReaderChapter } from "@/lib/api";

type ReaderPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ chapter?: string }>;
};

export default async function ReaderPage({ params, searchParams }: ReaderPageProps) {
  const { slug } = await params;
  const { chapter } = await searchParams;
  const chapterNumber = Number(chapter ?? "1");

  try {
    const data = await getReaderChapter(slug, Number.isFinite(chapterNumber) ? chapterNumber : 1);
    return <ReaderShell data={data} />;
  } catch {
    notFound();
  }
}
