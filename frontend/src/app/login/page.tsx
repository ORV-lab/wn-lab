import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getServerSession } from "@/lib/server-api";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getServerSession();
  const params = await searchParams;
  const nextPath = params.next || "/library";

  if (session) {
    redirect(nextPath);
  }

  return (
    <main className="auth-page">
      <AuthForm mode="login" nextPath={nextPath} />
    </main>
  );
}
