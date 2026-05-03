import { cn } from "@/lib/utils";

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 border-b border-zinc-100 dark:border-zinc-800", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-xl font-bold text-zinc-900 dark:text-zinc-100", className)}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-zinc-500 mt-1", className)}>{children}</p>;
}
