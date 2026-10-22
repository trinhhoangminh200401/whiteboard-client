'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full group">
        {label && (
          <label htmlFor={id} className="text-xs font-black uppercase tracking-widest text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full h-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400',
              'px-4 text-sm font-medium transition-all duration-300',
              'focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-11',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/5',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-1 px-1">Error: {error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
