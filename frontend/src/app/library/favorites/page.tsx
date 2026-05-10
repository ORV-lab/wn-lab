import { UserLibraryShell } from "@/components/library/library-shell";
import { getAuthenticatedLibrary, requireServerSession } from "@/lib/server-api";

export default async function LibraryFavoritesPage() {
  await requireServerSession("/library/favorites");
  const data = await getAuthenticatedLibrary("favorites");
  return <UserLibraryShell activeCategory="favorites" data={data} />;
}
