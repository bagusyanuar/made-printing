import { cn } from "@/lib/utils";

export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-3", className)}>{children}</div>;
}
