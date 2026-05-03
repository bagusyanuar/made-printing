"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { sidebarVariants, type SidebarVariants } from "./sidebar.variants";

interface SidebarProps extends SidebarVariants {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Sidebar({ 
  children, 
  className, 
  collapsed, 
  header, 
  footer 
}: SidebarProps) {
  return (
    <aside className={cn(sidebarVariants({ collapsed }), className)}>
      {header && <div className="p-6">{header}</div>}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {children}
      </nav>
      {footer && <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">{footer}</div>}
    </aside>
  );
}
