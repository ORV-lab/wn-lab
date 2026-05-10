import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { getServerSession } from "@/lib/server-api";

type RegisterPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const session = await getServerSession();
  const params = await searchParams;
  const nextPath = params.next || "/library";

  if (session) {
    redirect(nextPath);
  }

  return (
    <main className="auth-page">
      <AuthForm mode="register" nextPath={nextPath} />
    </main>
  );
}
