import { UserLibraryShell } from "@/components/library/library-shell";
import { getLibrary } from "@/lib/api";

export default async function LibraryFavoritesPage() {
  const data = await getLibrary("favorites");
  return <UserLibraryShell activeCategory="favorites" data={data} />;
}
