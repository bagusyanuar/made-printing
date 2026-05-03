"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { sidebarItemVariants, type SidebarItemVariants } from "./sidebar.variants";

/**
 * Sidebar Item (Single Link)
 */
interface SidebarItemProps extends SidebarItemVariants {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SidebarItem({ 
  href, 
  icon, 
  children, 
  active, 
  isChild,
  className,
  onClick 
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = active ?? pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(sidebarItemVariants({ active: isActive, isChild }), className)}
    >
      {icon && <span className={cn("size-5 flex items-center justify-center shrink-0", isActive ? "text-primary" : "text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100")}>{icon}</span>}
      <span className="truncate">{children}</span>
      {isActive && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
        />
      )}
    </Link>
  );
}

/**
 * Sidebar Item Tree (Collapsible)
 */
interface SidebarItemTreeProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarItemTree({ label, icon, children, defaultOpen = false }: SidebarItemTreeProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Sync state with pathname change (Render-phase update)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    const hasActiveChild = React.Children.toArray(children).some(
      (child) => 
        React.isValidElement(child) && 
        (child as React.ReactElement<{ href: string }>).props.href === pathname
    );
    if (hasActiveChild && !isOpen) {
      setIsOpen(true);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          sidebarItemVariants({ active: false }),
          "w-full justify-between"
        )}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="size-5 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">{icon}</span>}
          <span className="truncate">{label}</span>
        </div>
        <ChevronDown className={cn("size-4 text-zinc-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
