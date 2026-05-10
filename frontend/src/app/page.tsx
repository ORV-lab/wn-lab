import { LibraryShell } from "@/components/home/library-shell";
import { getHomePageData } from "@/lib/api";

export default async function HomePage() {
  const data = await getHomePageData();
  return <LibraryShell data={data} />;
}
