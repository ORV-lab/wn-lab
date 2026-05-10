import { UserLibraryShell } from "@/components/library/library-shell";
import { getAuthenticatedLibrary, requireServerSession } from "@/lib/server-api";

export default async function LibraryReadingPage() {
  await requireServerSession("/library/reading");
  const data = await getAuthenticatedLibrary("reading");
  return <UserLibraryShell activeCategory="reading" data={data} />;
}
