import { TranslateShell } from "@/components/translate/translate-shell";
import { getAuthenticatedTranslationDashboard, requireServerSession } from "@/lib/server-api";

export default async function TranslatePage() {
  await requireServerSession("/translate");
  const data = await getAuthenticatedTranslationDashboard();
  return <TranslateShell initialData={data} />;
}
