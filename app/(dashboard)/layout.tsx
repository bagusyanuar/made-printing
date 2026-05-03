import { getSession } from "@/features/auth/actions";
import { AppLayout } from "@/components/features/layout/AppLayout";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return (
    <AppLayout username={session.user.username}>
      {children}
    </AppLayout>
  );
}
