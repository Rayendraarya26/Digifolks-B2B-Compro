import React, { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'active:scale-[0.98]',
        {
          'bg-accent-emerald text-navy-base hover:bg-navy-light hover:text-text-pure hover:border hover:border-accent-emerald hover:scale-[1.02]':
            variant === 'primary',
          'bg-navy-light text-text-off-white border border-border-flat hover:border-accent-emerald hover:text-accent-emerald hover:translate-y-[-2px]':
            variant === 'secondary',
          'bg-transparent text-text-off-white border border-border-flat hover:bg-navy-light hover:text-accent-emerald':
            variant === 'ghost',
          'h-10 px-4 py-2': size === 'default',
          'h-9 rounded-md px-3': size === 'sm',
          'h-12 rounded-xl px-8 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
