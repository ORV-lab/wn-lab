import { SupportShell } from "@/components/shared/support-shell";
import { getSupportPage } from "@/lib/api";

export default async function SupportPage() {
  const data = await getSupportPage();
  return <SupportShell data={data} />;
}
