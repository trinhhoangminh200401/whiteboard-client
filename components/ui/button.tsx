'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'cta' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/10',
  cta: 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10',
  secondary: 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900',
  ghost: 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors',
  danger: 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-xs font-bold gap-2',
  md: 'h-11 px-5 text-sm font-bold gap-2.5',
  lg: 'h-13 px-7 text-base font-bold gap-3',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl transition-all duration-300 font-sans active:scale-95',
          'focus:outline-none focus:ring-4 focus:ring-indigo-500/10',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
