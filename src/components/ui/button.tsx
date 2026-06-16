import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'icon';
};

export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'button',
        `button-${variant}`,
        size === 'sm' && 'button-sm',
        size === 'icon' && 'button-icon',
        className,
      )}
      {...props}
    />
  );
}
