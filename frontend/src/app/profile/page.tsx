import { ProfileShell } from "@/components/profile/profile-shell";
import { getProfile } from "@/lib/api";

export default async function ProfilePage() {
  const data = await getProfile();
  return <ProfileShell data={data} />;
}
