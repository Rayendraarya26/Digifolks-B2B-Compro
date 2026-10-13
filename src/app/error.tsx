'use client';

import './globals.css';
import { useEffect } from 'react';
import { CustomErrorPage } from '@/components/errors/CustomErrorPage';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Global Application Error:', error);
  }, [error]);

  return (
    <html lang="id">
      <body className="antialiased bg-navy-base text-text-pure min-h-screen">
        <CustomErrorPage code="500" initialLang="id" onReload={reset} />
      </body>
    </html>
  );
}
