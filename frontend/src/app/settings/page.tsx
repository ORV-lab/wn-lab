import { SettingsShell } from "@/components/settings/settings-shell";
import { getAuthenticatedSettings, requireServerSession } from "@/lib/server-api";

export default async function SettingsPage() {
  await requireServerSession("/settings");
  const data = await getAuthenticatedSettings();
  return <SettingsShell initialSettings={data.reader} />;
}
