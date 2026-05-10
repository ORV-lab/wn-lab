import { UserLibraryShell } from "@/components/library/library-shell";
import { getLibrary } from "@/lib/api";

export default async function LibraryPage() {
  const data = await getLibrary("all");
  return <UserLibraryShell activeCategory="all" data={data} />;
}
