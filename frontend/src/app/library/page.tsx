import { UserLibraryShell } from "@/components/library/library-shell";
import { getAuthenticatedLibrary, requireServerSession } from "@/lib/server-api";

export default async function LibraryPage() {
  await requireServerSession("/library");
  const data = await getAuthenticatedLibrary("all");
  return <UserLibraryShell activeCategory="all" data={data} />;
}
