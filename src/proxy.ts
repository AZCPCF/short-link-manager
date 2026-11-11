import { hasLocale } from "next-intl";
import createIntlProxy from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { locales, type AppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { auth } from "@/lib/auth/server";

const intlProxy = createIntlProxy(routing);

const loginUrlFor = (locale: AppLocale): string => `/${locale}/login`;

const authProxies: Record<AppLocale, ReturnType<typeof auth.middleware>> = {
  en: auth.middleware({ loginUrl: loginUrlFor("en") }),
  fa: auth.middleware({ loginUrl: loginUrlFor("fa") }),
};

function parsePath(pathname: string): { locale: AppLocale | null; path: string } {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (hasLocale(locales, first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: null, path: pathname };
}

export default async function proxy(request: NextRequest) {
  const { locale, path } = parsePath(request.nextUrl.pathname);
  let authCookies: string[] = [];

  if (locale && (path === "/dashboard" || path.startsWith("/dashboard/"))) {
    const authResponse = await authProxies[locale](request);
    if (authResponse.headers.has("location")) return authResponse;
    authCookies = authResponse.headers.getSetCookie();
  }

  const response = intlProxy(request);
  for (const cookie of authCookies) response.headers.append("set-cookie", cookie);
  return response;
}

export const config = {
  matcher: ["/((?!api/|r/|_next/|_vercel/|.*\\..*).*)"],
};