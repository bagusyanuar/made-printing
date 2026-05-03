import * as React from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export function Navbar({ children, className, leftContent, rightContent }: NavbarProps) {
  return (
    <header className={cn(
      "h-16 w-full flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30",
      className
    )}>
      <div className="flex items-center gap-4">
        {leftContent}
        {children}
      </div>
      <div className="flex items-center gap-4">
        {rightContent}
      </div>
    </header>
  );
}
