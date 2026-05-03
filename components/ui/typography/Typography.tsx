import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { typographyVariants } from './typography.variants';

interface TypographyProps extends VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, children, ...props }, ref) => {
    const variantMapping: Record<string, React.ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      p: 'p',
      blockquote: 'blockquote',
      list: 'ul',
      lead: 'p',
      large: 'p',
      small: 'p',
      muted: 'p',
    };

    const Component = as || (variant ? variantMapping[variant] : 'p') || 'p';

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export { Typography };
