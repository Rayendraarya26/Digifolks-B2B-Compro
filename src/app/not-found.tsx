import './globals.css';
import { headers } from 'next/headers';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { CustomErrorPage } from '@/components/errors/CustomErrorPage';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get('referer') || '';
  const xLang = headersList.get('x-lang') || '';
  const initialLang: 'en' | 'id' = (xLang === 'en' || referer.includes('/en')) ? 'en' : 'id';

  return (
    <html lang={initialLang} className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-navy-base text-text-pure min-h-screen">
        <CustomErrorPage code="404" initialLang={initialLang} />
      </body>
    </html>
  );
}
