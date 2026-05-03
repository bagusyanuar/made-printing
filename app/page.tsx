import { LoginHeader, LoginForm, LoginFooter } from "@/components/features/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 font-sans">
      <div className="w-full max-w-[400px] space-y-8 animate-fade-in">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
}
