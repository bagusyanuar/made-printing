import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export function LoginFooter() {
  return (
    <div className="space-y-4 animate-fade-in animate-delay-300">
      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" prefetch={false} className="text-primary font-bold hover:underline">
          Hubungi Admin
        </Link>
      </p>

      <div className="text-center">
        <Typography variant="small" className="text-zinc-400">
          &copy; {new Date().getFullYear()} Made Digital Printing. All rights reserved.
        </Typography>
      </div>
    </div>
  );
}
