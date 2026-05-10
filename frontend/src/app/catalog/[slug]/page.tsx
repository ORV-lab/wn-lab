import { notFound } from "next/navigation";
import { RanobeDetailShell } from "@/components/catalog/ranobe-detail-shell";
import { getBookDetail } from "@/lib/api";

type BookDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;

  try {
    const data = await getBookDetail(slug);
    return <RanobeDetailShell data={data} />;
  } catch {
    notFound();
  }
}
