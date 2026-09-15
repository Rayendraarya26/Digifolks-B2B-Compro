import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'id'];
const defaultLocale = 'en';

// Locales that are currently enabled (hide 'id' for now)
const enabledLocales = ['en'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files, api routes, and Next.js internals
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // Redirect /login or /:lang/login to /:lang/admin/login
  if (pathname === '/login' || pathname === '/en/login' || pathname === '/id/login') {
    request.nextUrl.pathname = `/${defaultLocale}/admin/login`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Redirect disabled locales (e.g. /id/...) to default locale
  const disabledLocale = locales.find(
    (locale) =>
      !enabledLocales.includes(locale) &&
      (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  );
  if (disabledLocale) {
    const newPath = pathname.replace(`/${disabledLocale}`, `/${defaultLocale}`);
    request.nextUrl.pathname = newPath || `/${defaultLocale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Check if pathname already has an enabled locale
  const pathnameHasLocale = enabledLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
