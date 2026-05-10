import { UserLibraryShell } from "@/components/library/library-shell";
import { getAuthenticatedLibrary, requireServerSession } from "@/lib/server-api";

export default async function LibraryCompletedPage() {
  await requireServerSession("/library/completed");
  const data = await getAuthenticatedLibrary("completed");
  return <UserLibraryShell activeCategory="completed" data={data} />;
}
