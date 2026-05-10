import { CatalogShell } from "@/components/catalog/catalog-shell";
import { getCatalogBooks } from "@/lib/api";

type CatalogPageProps = {
  searchParams: Promise<{
    q?: string;
    genre?: string;
    status?: string;
    sort?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const query = await searchParams;
  const data = await getCatalogBooks(query);
  return <CatalogShell data={data} query={query} />;
}
