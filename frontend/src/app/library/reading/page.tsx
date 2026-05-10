import { UserLibraryShell } from "@/components/library/library-shell";
import { getLibrary } from "@/lib/api";

export default async function LibraryReadingPage() {
  const data = await getLibrary("reading");
  return <UserLibraryShell activeCategory="reading" data={data} />;
}
