import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { textFieldVariants } from './text-field.variants';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof textFieldVariants> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, type, variant, size, prefixIcon, suffixIcon, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="relative flex items-center w-full">
          {prefixIcon && (
            <div className="absolute left-3 flex items-center text-muted-foreground [&_svg]:size-4">
              {prefixIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              textFieldVariants({
                variant: error ? 'error' : variant,
                size,
                hasPrefix: !!prefixIcon,
                hasSuffix: !!suffixIcon,
                className,
              })
            )}
            ref={ref}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute right-3 flex items-center text-muted-foreground [&_svg]:size-4">
              {suffixIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-destructive animate-fade-in pl-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
TextField.displayName = 'TextField';

export { TextField };
