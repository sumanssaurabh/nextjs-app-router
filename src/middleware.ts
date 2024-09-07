import { NextResponse, NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { locales, type Locale, defaultLocale } from './i18n.config';

function getLocale(request: NextRequest) {
  // let languages = new Negotiator({ headers }).languages();

  const headers = request.headers.get('accept-language') || '';

  // Create a Negotiator instance with request headers
  const negotiator = new Negotiator({
    headers: {
      'accept-language': headers,
    },
  });

  // Get the preferred languages from the Accept-Language header
  const languages = negotiator.languages();

  // Return the first preferred language, or default to 'en-US'
  return languages[0] || defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the pathname already includes a locale, do nothing
  if (pathnameHasLocale) return;

  // If no locale is found, determine the appropriate locale for the user
  const locale = getLocale(request);

  // Redirect to the new URL with the locale prefixed
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
