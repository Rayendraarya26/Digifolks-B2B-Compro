import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { HOMEPAGE_MARKDOWN, NOT_FOUND_MARKDOWN, isKnownPath } from '@/lib/agent-markdown';

const locales = ['en', 'id'];
const defaultLocale = 'en';

// Locales that are currently enabled
const enabledLocales = ['en', 'id'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get('accept') || '';
  const wantsMarkdown = acceptHeader.includes('text/markdown');

  // Skip public files (except directory paths), api routes, metadata routes, and Next.js internals
  const isMetadataRoute =
    pathname === '/opengraph-image' ||
    pathname === '/twitter-image' ||
    pathname === '/manifest.json' ||
    pathname === '/site.webmanifest' ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/.well-known');

  if (
    pathname.includes('.') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next') ||
    isMetadataRoute
  ) {
    return NextResponse.next();
  }

  // Rewrite localized metadata requests to root static metadata
  if (
    pathname === '/en/opengraph-image' ||
    pathname === '/id/opengraph-image' ||
    pathname === '/en/manifest.json' ||
    pathname === '/id/manifest.json' ||
    pathname === '/en/site.webmanifest' ||
    pathname === '/id/site.webmanifest'
  ) {
    const cleanPath = pathname.replace(/^\/(en|id)/, '');
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = cleanPath;
    return NextResponse.rewrite(rewriteUrl);
  }

  // 1. Agent Content Negotiation (acceptmarkdown.com & Ora / Vercel is-agentic audit)
  if (wantsMarkdown) {
    // If route is unknown / probe 404
    if (!isKnownPath(pathname)) {
      return new NextResponse(NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Serve rich Markdown representation for homepage or core sections
    return new NextResponse(HOMEPAGE_MARKDOWN, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  }

  // 2. Redirect /login or /:lang/login to /:lang/admin/login
  if (pathname === '/login' || pathname === '/en/login' || pathname === '/id/login') {
    request.nextUrl.pathname = `/${defaultLocale}/admin/login`;
    const res = NextResponse.redirect(request.nextUrl);
    res.headers.set('Vary', 'Accept');
    return res;
  }

  // 3. Redirect disabled locales (e.g. /id/...) to default locale
  const disabledLocale = locales.find(
    (locale) =>
      !enabledLocales.includes(locale) &&
      (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  );
  if (disabledLocale) {
    const newPath = pathname.replace(`/${disabledLocale}`, `/${defaultLocale}`);
    request.nextUrl.pathname = newPath || `/${defaultLocale}`;
    const res = NextResponse.redirect(request.nextUrl);
    res.headers.set('Vary', 'Accept');
    return res;
  }

  // Setup request headers for downstream server components & error pages
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const detectedLang = pathname.startsWith('/id') ? 'id' : 'en';
  requestHeaders.set('x-lang', detectedLang);
  const pathnameHasLocale = enabledLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const res = NextResponse.next();
    res.headers.set('Vary', 'Accept');
    return res;
  }

  // 5. Rewrite root path '/' directly to default locale to eliminate redirect chains on main domain
  if (pathname === '/') {
    request.nextUrl.pathname = `/${defaultLocale}`;
    const res = NextResponse.rewrite(request.nextUrl, {
      request: {
        headers: requestHeaders,
      },
    });
    res.headers.set('Vary', 'Accept');
    return res;
  }

  // 6. Redirect other paths without locale to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  const res = NextResponse.redirect(request.nextUrl);
  res.headers.set('Vary', 'Accept');
  return res;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
