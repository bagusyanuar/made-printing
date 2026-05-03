'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TextField, type TextFieldProps } from '../text-field';

export type PasswordFieldProps = Omit<TextFieldProps, 'suffixIcon' | 'type'>;

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <TextField
        type={showPassword ? 'text' : 'password'}
        className={className}
        ref={ref}
        suffixIcon={
          <button
            type="button"
            className="flex h-full w-full items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);
PasswordField.displayName = 'PasswordField';

export { PasswordField };
