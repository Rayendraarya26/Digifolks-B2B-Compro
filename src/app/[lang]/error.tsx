'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CustomErrorPage } from '@/components/errors/CustomErrorPage';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const lang = (params?.lang as 'en' | 'id') || 'id';

  useEffect(() => {
    console.error('Locale Route Application Error:', error);
  }, [error]);

  return <CustomErrorPage code="500" initialLang={lang} onReload={reset} />;
}
