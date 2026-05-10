import { UserLibraryShell } from "@/components/library/library-shell";
import { getLibrary } from "@/lib/api";

export default async function LibraryCompletedPage() {
  const data = await getLibrary("completed");
  return <UserLibraryShell activeCategory="completed" data={data} />;
}
