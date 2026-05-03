import { cva, type VariantProps } from "class-variance-authority";

export const sidebarVariants = cva(
  "flex flex-col h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300",
  {
    variants: {
      collapsed: {
        true: "w-20",
        false: "w-72",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

export const sidebarItemVariants = cva(
  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
  {
    variants: {
      active: {
        true: "bg-primary/10 text-primary",
        false: "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100",
      },
      isChild: {
        true: "ml-4",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
      isChild: false,
    },
  }
);

export type SidebarVariants = VariantProps<typeof sidebarVariants>;
export type SidebarItemVariants = VariantProps<typeof sidebarItemVariants>;
