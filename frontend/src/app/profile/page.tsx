import { ProfileShell } from "@/components/profile/profile-shell";
import { getAuthenticatedProfile, requireServerSession } from "@/lib/server-api";

export default async function ProfilePage() {
  await requireServerSession("/profile");
  const data = await getAuthenticatedProfile();
  return <ProfileShell data={data} />;
}
