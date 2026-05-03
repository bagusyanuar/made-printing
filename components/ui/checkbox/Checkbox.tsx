'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center justify-center h-4 w-4">
        <input
          type="checkbox"
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-primary checked:text-primary-foreground transition-colors',
            className
          )}
          ref={ref}
          {...props}
        />
        <Check 
          className="absolute h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
          strokeWidth={3}
        />
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
