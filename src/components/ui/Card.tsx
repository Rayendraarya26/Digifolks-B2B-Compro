import React, { HTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
}

export function Card({ className, hoverLift = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-pure border border-border-flat rounded-xl overflow-hidden',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        {
          'hover:-translate-y-1 hover:border-brand-navy hover:shadow-[0_12px_24px_-8px_rgba(10,37,64,0.15)]':
            hoverLift,
        },
        className
      )}
      {...props}
    />
  );
}
