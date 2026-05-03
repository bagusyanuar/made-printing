import { cva, type VariantProps } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-xl border p-4 [&>svg~div]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/5",
        success:
          "border-emerald-500/50 text-emerald-600 dark:border-emerald-500 [&>svg]:text-emerald-600 bg-emerald-50",
        warning:
          "border-amber-500/50 text-amber-600 dark:border-amber-500 [&>svg]:text-amber-600 bg-amber-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;
