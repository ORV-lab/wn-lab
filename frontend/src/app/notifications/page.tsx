import { NotificationsShell } from "@/components/notifications/notifications-shell";
import { getNotifications } from "@/lib/api";

export default async function NotificationsPage() {
  const data = await getNotifications();
  return <NotificationsShell initialData={data} />;
}
