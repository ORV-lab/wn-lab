import { SettingsShell } from "@/components/settings/settings-shell";
import { getSettings } from "@/lib/api";

export default async function SettingsPage() {
  const data = await getSettings();
  return <SettingsShell initialSettings={data.reader} />;
}
