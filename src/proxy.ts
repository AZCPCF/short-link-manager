import { hasLocale } from "next-intl";
import createIntlProxy from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { locales, type AppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { auth } from "@/lib/auth/server";

const intlProxy = createIntlProxy(routing);

// Only used to detect a session: the auth middleware answers with a redirect
// when there is none. The target path is never followed.
const sessionProbe = auth.middleware({ loginUrl: "/session-probe" });

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

function redirectTo(
  request: NextRequest,
  pathname: string,
  cookies: string[],
): NextResponse {
  const response = NextResponse.redirect(new URL(pathname, request.url));
  for (const cookie of cookies) response.headers.append("set-cookie", cookie);
  return response;
}

export default async function proxy(request: NextRequest) {
  const { locale, path } = parsePath(request.nextUrl.pathname);
  let sessionCookies: string[] = [];

  if (locale && (isDashboardPath(path) || isAuthPagePath(path))) {
    const probeResponse = await sessionProbe(request);
    const signedIn = !probeResponse.headers.has("location");
    sessionCookies = probeResponse.headers.getSetCookie();

    if (isDashboardPath(path) && !signedIn) {
      return redirectTo(request, `/${locale}`, sessionCookies);
    }
    if (isAuthPagePath(path) && signedIn) {
      return redirectTo(request, `/${locale}/dashboard`, sessionCookies);
    }
  }

  const response = intlProxy(request);
  for (const cookie of sessionCookies) {
    response.headers.append("set-cookie", cookie);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api/|r/|_next/|_vercel/|.*\\..*).*)"],
};
