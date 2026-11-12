import { hasLocale } from "next-intl";
import createIntlProxy from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { locales, type AppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { auth } from "@/lib/auth/server";

const intlProxy = createIntlProxy(routing);

const homeUrlFor = (locale: AppLocale): string => `/${locale}`;

const authProxies: Record<AppLocale, ReturnType<typeof auth.middleware>> = {
  en: auth.middleware({ loginUrl: homeUrlFor("en") }),
  fa: auth.middleware({ loginUrl: homeUrlFor("fa") }),
};

const isDashboardPath = (path: string): boolean =>
  path === "/dashboard" || path.startsWith("/dashboard/");

const isAuthPagePath = (path: string): boolean =>
  path === "/login" || path === "/signup";

function parsePath(pathname: string): {
  locale: AppLocale | null;
  path: string;
} {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (hasLocale(locales, first)) {
    return { locale: first, path: `/${rest.join("/")}` };
  }
  return { locale: null, path: pathname };
}

export default async function proxy(request: NextRequest) {
  const { locale, path } = parsePath(request.nextUrl.pathname);
  let authCookies: string[] = [];

  if (locale && isDashboardPath(path)) {
    const authResponse = await authProxies[locale](request);
    if (authResponse.headers.has("location")) return authResponse;
    authCookies = authResponse.headers.getSetCookie();
  }

  if (locale && isAuthPagePath(path)) {
    // The auth middleware redirects only unauthenticated requests,
    // so a response without a redirect means the user is signed in.
    const authResponse = await authProxies[locale](request);
    if (!authResponse.headers.has("location")) {
      const redirectResponse = NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url),
      );
      for (const cookie of authResponse.headers.getSetCookie()) {
        redirectResponse.headers.append("set-cookie", cookie);
      }
      return redirectResponse;
    }
  }

  const response = intlProxy(request);
  for (const cookie of authCookies) {
    response.headers.append("set-cookie", cookie);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api/|r/|_next/|_vercel/|.*\\..*).*)"],
};
