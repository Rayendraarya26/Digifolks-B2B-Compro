import { headers } from 'next/headers';
import { CustomErrorPage } from '@/components/errors/CustomErrorPage';

export default async function LocaleNotFound() {
  const headersList = await headers();
  const referer = headersList.get('referer') || '';
  const xLang = headersList.get('x-lang') || '';
  const initialLang: 'en' | 'id' = (xLang === 'en' || referer.includes('/en')) ? 'en' : 'id';

  return <CustomErrorPage code="404" initialLang={initialLang} />;
}
