import { TermsShell } from "@/components/shared/terms-shell";
import { getTerms } from "@/lib/api";

export default async function TermsPage() {
  const data = await getTerms();
  return <TermsShell data={data} />;
}
