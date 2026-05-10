import { NotificationsShell } from "@/components/notifications/notifications-shell";
import { getAuthenticatedNotifications, requireServerSession } from "@/lib/server-api";

export default async function NotificationsPage() {
  await requireServerSession("/notifications");
  const data = await getAuthenticatedNotifications();
  return <NotificationsShell initialData={data} />;
}
