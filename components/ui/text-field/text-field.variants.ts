import { cva } from 'class-variance-authority';

export const textFieldVariants = cva(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-ring',
        error: 'border-destructive focus-visible:ring-destructive',
      },
      size: {
        default: 'h-9 px-3 py-1',
        sm: 'h-8 px-2 py-1 text-xs',
        lg: 'h-10 px-4 py-2 text-base',
      },
      hasPrefix: {
        true: 'pl-10',
      },
      hasSuffix: {
        true: 'pr-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hasPrefix: false,
      hasSuffix: false,
    },
  }
);
