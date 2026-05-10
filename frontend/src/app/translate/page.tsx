import { TranslateShell } from "@/components/translate/translate-shell";
import { getTranslationDashboard } from "@/lib/api";

export default async function TranslatePage() {
  const data = await getTranslationDashboard();
  return <TranslateShell initialData={data} />;
}
